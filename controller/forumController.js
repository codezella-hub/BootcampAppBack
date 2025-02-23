const Forum = require("../models/forum")
const User = require("../models/user"); 

// Ajouter un forum
async function addForum(req, res) {
    try {
        const { title, description, image, user,categorie } = req.body;
        const foundUser = await User.findById(user);
        if (!foundUser) {
            return res.status(404).send('User not found');
        }

        // Créer un nouveau forum
        const newForum = new Forum({
            title,
            description,
            image,
            user,
            categorie,
            commentCount: 0,
            likeCount:0,
            reported: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await newForum.save();
        res.status(200).json(newForum);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating forum');
    }
};

// Afficher tous les forums
async function showAllForums(req, res) {
    try {
        const forums = await Forum.find();
        res.status(200).json(forums);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching forums');
    }
}

// Afficher un forum par ID
async function showForumById(req, res) {
    try {
        const forum = await Forum.findById(req.params.id);

        if (!forum) {
            return res.status(404).send('Forum not found');
        }
        res.status(200).json(forum);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching forum');
    }
}

// Mettre à jour un forum
async function updateForum(req, res) {
    try {
        
        const { title, description, image,categorie } = req.body;

        const updatedForum = await Forum.findByIdAndUpdate(
            req.params.id,{ title, description, image, categorie,updatedAt: new Date() },{ new: true }
        );

        if (!updatedForum) {
            return res.status(404).send('Forum not found');
        }

        res.status(200).json(updatedForum);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating forum');
    }
}

// Supprimer un forum
async function deleteForum(req, res) {
    try {
        

        const deletedForum = await Forum.findByIdAndDelete(req.params.id);

        if (!deletedForum) {
            return res.status(404).send('Forum not found');
        }

        res.status(200).send('Forum deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting forum');
    }
}

module.exports = { addForum, showAllForums, showForumById, updateForum, deleteForum };
