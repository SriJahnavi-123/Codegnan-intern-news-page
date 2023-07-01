// script.js
document.addEventListener('DOMContentLoaded', () => {
  const newsForm = document.getElementById('newsForm');
  const titleInput = document.getElementById('titleInput');
  const contentInput = document.getElementById('contentInput');
  const articleList = document.getElementById('articleList');

  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const content = contentInput.value;
    saveArticle(title, content);
  });

  function saveArticle(title, content) {
    fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
      .then(response => response.json())
      .then(article => {
        displayArticle(article);
        titleInput.value = '';
        contentInput.value = '';
      })
      .catch(error => console.log(error));
  }

  function displayArticle(article) {
    const articleElement = document.createElement('div');
    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.content}</p>
      <hr>
    `;
    articleList.prepend(articleElement);
  }

  function getArticles() {
    fetch('/api/articles')
      .then(response => response.json())
      .then(articles => {
        articles.forEach(article => {
          displayArticle(article);
        });
      })
      .catch(error => console.log(error));
  }

  getArticles();
});