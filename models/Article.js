const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'] // Email validation regex
  },
  category: { 
    type: String,  
    required: true,
  },
  image: { 
    type: String, 
    default: "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=" 
  },
  publishedAt: { 
    type: Date
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
