const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// -------------------- Models --------------------

// Category model
const CategorySchema = new mongoose.Schema({
  Name: { type: String, required: true },
});
const Category = mongoose.model("Category", CategorySchema);

// Article model
const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=",
  },
  publishedAt: {
    type: Date,
  },
});
const Article = mongoose.model("Article", ArticleSchema);

// -------------------- Routes --------------------

// Category routes
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories.sort((a, b) => a.Name.localeCompare(b.Name)));
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
});

app.get("/categories/:Name", async (req, res) => {
  const { Name } = req.params;
  try {
    const category = await Category.findOne({ Name });
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching category");
  }
});

// Article routes
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles.sort((a, b) => b.publishedAt - a.publishedAt));
  } catch (error) {
    res.status(500).send("Error fetching articles");
  }
});

app.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.send(article);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching article");
  }
});

app.post("/articles", async (req, res) => {
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
    res.status(500).json({ message: "Error adding article", error: error.message });
  }
});

// -------------------- Server --------------------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
