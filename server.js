//Backend (Node.js with Express and MongoDB):

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/news_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));

// Create article schema and model
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('Article', articleSchema);

// API routes
app.get('/api/articles', (req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(error => res.status(500).json({ error }));
});

app.post('/api/articles', (req, res) => {
  const { title, content } = req.body;
  const article = new Article({ title, content });
  article.save()
    .then(savedArticle => res.json(savedArticle))
    .catch(error => res.status(500).json({ error }));
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


