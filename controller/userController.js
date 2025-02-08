const User = require('../models/user');


// add new joueur
async function addUser(req, res) {
    try {
        const newUser = new User({
            "name":req.body.name,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user');
    }
}

// Export all functions
module.exports = {
    addUser,
};