const express = require('express');
const router = express.Router();
const forumController = require('../controller/forumController');
const validate = require('../middleware/forumValidate');
const {scrapeCourses} =require('../controller/scraper');


router.post('/forums', forumController.upload.single('image'),validate.validateForum, forumController.addForum);
router.get('/forums', forumController.showAllForums);
router.get('/forums/:id', forumController.showForumById);
router.get('/forums/user/:id', forumController.showForumsByUser);
router.put('/forums/:id',forumController.upload.single('image'), validate.validateForum, forumController.updateForum);
router.delete('/forums/:id', forumController.deleteForum);
router.get("/scrape", async (req, res) => {
const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await scrapeCourses(limit);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
});

module.exports = router;
