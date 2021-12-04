async function queryBestArticle() {
  const res = await fetch(`http://seheon.email/api/articles/best`);
  const [articles, numberOfArticles] = await res.json();
  return { articles, numberOfArticles };
}

async function loadBestArticles() {
  const bestArticlePlace = document.querySelector('#best-article > ol');
  const { articles, numberOfArticles } = await queryBestArticle();

  articles.map((article) => {
    bestArticlePlace.insertAdjacentHTML(
      'beforeend',
      `
      <li class="list-element" article-id="${article.id}">
        <span class="title">${article.title}</span>
        <span class="like-count">${article.likeCount} likes</span>
        <span class="view-count">${article.viewCount} views</span>
      </li>
      `
    );
  });

  const commentElements = document.querySelectorAll('#best-article > ol > li');
  commentElements.forEach((value, key, parent) => {
    const articleId = value.attributes.getNamedItem('article-id').value;
    value.addEventListener('click', (event) => {
      location.href = `./community/article.html?id=${articleId}`;
    });
  });
}

async function queryRecentComments() {
  const res = await fetch(`http://seheon.email/api/comments?limit=5`);
  const [comments, numberOfComments] = await res.json();
  return { comments, numberOfComments };
}

async function loadRecentComments() {
  const recentArticlePlace = document.querySelector('#recent-comment > ol');
  const { comments, numberOfComments } = await queryRecentComments();

  comments.map((comment) => {
    recentArticlePlace.insertAdjacentHTML(
      'beforeend',
      `
      <li class="list-element" article-id="${comment.articleId}">
        <span class="content">${comment.content}</span>
        <span class="like-count">${comment.likeCount} likes, </span>
        <span class="created-at">${new Date(
          Date.parse(comment.createdAt)
        ).toLocaleString()}</span>
      </li>
      `
    );
  });

  const commentElements = document.querySelectorAll(
    '#recent-comment > ol > li'
  );
  commentElements.forEach((value, key, parent) => {
    const articleId = value.attributes.getNamedItem('article-id').value;
    value.addEventListener('click', (event) => {
      location.href = `./community/article.html?id=${articleId}`;
    });
  });
}

window.onload = async () => {
  await loadBestArticles();
  await loadRecentComments();
};
