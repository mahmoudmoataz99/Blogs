const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles.sort((a, b) => b.publishedAt - a.publishedAt));
  } catch (error) {
    res.status(500).send("Error fetching articles");
  }
});

// Get article by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    return res.send(article);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching article");
  }
});

// Add new article
router.post("/", async (req, res) => {
  const { title, content, author, email, category, image } = req.body;

  if (!title || !content || !author || !email || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newArticle = new Article({
      title,
      content,
      author,
      email,
      category,
      image,
      publishedAt: new Date(),
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error adding article:", error);
    res
      .status(500)
      .json({ message: "Error adding article", error: error.message });
  }
});

// Remove Article
router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;

  try {
    const article = await Article.findByIdAndDelete(id);

    return res.status(200).json({ message: "Article deleted successfully",article });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting article");
  }
});

module.exports = router;
