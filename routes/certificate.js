const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Ajouter sharp pour la conversion
const router = express.Router();
const QRCode = require('qrcode');


const User = require('../models/User'); 
const Course = require('../models/course');
const os = require('os');
const Order = require('../models/orders');

function getLocalIPv4() {
  const interfaces = os.networkInterfaces();

  for (const name in interfaces) {
    const ifaceList = interfaces[name];

    for (const iface of ifaceList) {
      if (
        iface.family === 'IPv4' &&
        !iface.internal &&
        name.toLowerCase().includes('wi-fi') // s'assurer que c’est bien l’interface Wi-Fi
      ) {
        return iface.address;
      }
    }
  }

  // Si Wi-Fi non trouvé, prendre la première IPv4 non interne
  for (const ifaceList of Object.values(interfaces)) {
    for (const iface of ifaceList) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return 'localhost'; // fallback
}



router.get('/:userId/:courseId', async (req, res) => {
    const { userId, courseId } = req.params;

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);
        
        if (!user || !course) {
            return res.status(404).json({ message: 'Utilisateur ou cours introuvable.' });
        }

        const ip = getLocalIPv4();
        const certUrl = `http://${ip}:3000/api/certificate/${userId}/${courseId}`;

        // Générer un QR code
        const qrImageData = await QRCode.toDataURL(certUrl);
        const qrImageBuffer = Buffer.from(qrImageData.split(',')[1], 'base64');

        const fullName = `${user.firstname} ${user.lastname}`;
        const courseTitle = course.title;

        // Créer le PDF en paysage
        const doc = new PDFDocument({ 
            size: 'A4', 
            layout: 'landscape',
            margin: 0
        });

        // Gestion des erreurs
        let hasError = false;
        doc.on('error', (err) => {
            hasError = true;
            console.error('PDF generation error:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'PDF generation failed' });
            }
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="certificate-${userId}-${courseId}.pdf"`);
        doc.pipe(res);

        // Dimensions
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const centerX = pageWidth / 2; // Vrai centre de la page
        const margin = 40;

        // Fond blanc
        doc.rect(0, 0, pageWidth, pageHeight).fill('#ffffff');

        // Fonction pour charger les images
        const loadImage = async (filePath) => {
            if (!fs.existsSync(filePath)) return null;
            try {
                return await sharp(filePath).toBuffer();
            } catch (err) {
                console.error(`Error loading image ${filePath}:`, err);
                return null;
            }
        };

        // Charger les images
        const [logo, badge] = await Promise.all([
            loadImage(path.join(__dirname, '..', 'uploads', 'logo', 'logo.png')),
            loadImage(path.join(__dirname, '..', 'uploads', 'badge', 'image.png'))
        ]);

        // Logo en haut à gauche (120x40)
        if (logo) {
            doc.image(logo, margin, margin, { width: 120, height: 30 });
        }

        // Badge à droite (150x150)
        if (badge) {
            doc.image(badge, pageWidth - margin - 150, margin , { width: 150, height: 150 });
        }

        // Zone de contenu central (entre le logo et le badge)
        const contentWidth = pageWidth - 2 * margin - 150 - 120; // Largeur disponible entre logo et badge
        const contentStartX = margin -130 + (contentWidth / 2); // Centre de la zone de contenu

        // Titre principal centré
        doc.font('Helvetica-Bold')
           .fontSize(28)
           .fillColor('#2c3e50')
           .text('CERTIFICAT DE RÉUSSITE', contentStartX, margin + 150, { 
               align: 'center',
               width: contentWidth
           });

        // Contenu central
        const contentY = margin + 200;
        
        // Texte "Ce certificat est décerné à"
        doc.font('Helvetica')
           .fontSize(16)
           .fillColor('#4a5568')
           .text('Ce certificat est décerné à :', contentStartX, contentY, { 
               align: 'center',
               width: contentWidth
           });

        // Nom de l'étudiant
        doc.font('Helvetica-Bold')
           .fontSize(22)
           .fillColor('#2b6cb0')
           .text(fullName, contentStartX, contentY + 40, { 
               align: 'center',
               width: contentWidth
           });

        // Texte "Pour avoir complété..."
        doc.font('Helvetica')
           .fontSize(16)
           .fillColor('#4a5568')
           .text('Pour avoir complété avec succès le cours :', contentStartX, contentY + 90, { 
               align: 'center',
               width: contentWidth
           });

        // Titre du cours
        doc.font('Helvetica-Bold')
           .fontSize(20)
           .fillColor('#2c3e50')
           .text(`"${courseTitle}"`, contentStartX, contentY + 130, { 
               align: 'center',
               width: contentWidth
           });

        // QR Code en bas à droite (80x80)
        doc.image(qrImageBuffer, 
                 pageWidth - margin - 80, 
                 pageHeight - margin - 80, 
                 { width: 80, height: 80 });

        // Date et nom du site en bas à gauche
        doc.font('Helvetica')
           .fontSize(12)
           .fillColor('#718096')
           .text(`Fait le : ${new Date().toLocaleDateString('fr-FR')}`, 
                 margin, 
                 pageHeight - margin - 30);

        doc.font('Helvetica-Oblique')
           .fontSize(12)
           .text('Bootcamp StudyHub - www.studyhub.com', 
                 margin, 
                 pageHeight - margin - 10);

        // Finalisation
        if (!hasError) {
            doc.end();
            
            // Mise à jour de la base de données
            await Order.findOneAndUpdate(
                { userid: userId, "items.courseId": courseId },
                { $set: { "items.$.certificate": true } },
                { new: true }
            );
        }

    } catch (error) {
        console.error('Certificate generation error:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur lors de la génération du certificat.' });
        }
    }
});
router.get("/check-certificate/:userId/:courseId", async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    // Trouver les commandes où certificate = true pour le user et le course donné
    const order = await Order.findOne({
      userid: userId,
      "items.courseId": courseId,
      "items.certificate": true
    });

    if (order) {
      return res.json({ certificate: true });
    } else {
      return res.json({ certificate: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la vérification du certificat." });
  }
});


module.exports = router;
