
const Course = require('../models/course');
const User = require('../models/user');
const Orders = require('../models/Orders');
const Category = require('../models/category')
const Response = require('../models/Response');

getCourseCount = async (req, res) => {
    try {
        const count = await Course.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

countUsers = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

countEnrollments = async (req, res) => {
    try {
        // Compter chaque item comme une inscription (ignorer quantity)
        const result = await Orders.aggregate([
            { $unwind: "$items" }, // Décompose le tableau items
            { $group: { _id: null, count: { $sum: 1 } }} // Compte simplement chaque item
        ]);
        
        const count = result.length > 0 ? result[0].count : 0;
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

countCategories = async (req, res) => {
    try {
        const count = await Category.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

coursesByCategory = async (req, res) => {
    try {
        const results = await Course.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $unwind: "$categoryInfo"
            },
            {
                $project: {
                    categoryName: "$categoryInfo.title",
                    count: 1,
                    _id: 0
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

quizSuccessFailureStats = async (req, res) => {
    try {
        const results = await Response.aggregate([
            {
                $group: {
                    _id: {
                        $cond: [{ $gt: ["$score", 50] }, "Passed", "Failed"]
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1
                }
            }
        ]);

        // Formatage pour avoir toujours les deux catégories même si count = 0
        const passedCount = results.find(r => r.status === "Passed")?.count || 0;
        const failedCount = results.find(r => r.status === "Failed")?.count || 0;

        res.json([
            { status: "Passed", count: passedCount },
            { status: "Failed", count: failedCount }
        ]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
getCoursesByRating = async (req, res) => {
    try {
        const courses = await Course.find({})
            .select('title rating') // Sélectionne seulement le titre et le rating
            .sort({ rating: -1 })   // Trie par rating décroissant
            .limit(50);             // Limite à 50 résultats (optionnel)

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exporter les fonctions
module.exports = {
    getCourseCount,
    countUsers,
    countEnrollments,
    countCategories,coursesByCategory,
    quizSuccessFailureStats,
    getCoursesByRating
  };