const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String }, // URL de l'image du forum
        users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// Créateur du forum
        commentCount: { type: Number, default: 0 }, // Nombre de commentaires
        reported: { type: Boolean, default: false }, // Indique si le forum a été signalé
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentForum' }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likeforum" }], // Référence aux likes
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model('Forum', ForumSchema);
