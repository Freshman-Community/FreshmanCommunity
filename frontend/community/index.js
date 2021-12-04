async function queryArticles(offset, limit) {
  const res = await fetch(
    `http://seheon.email/api/articles?offset=${offset}&limit=${limit}`,
    {
      mode: 'cors',
      headers: { 'Access-Control-Request-Origin': 'http://seheon.email' },
    }
  );
  const [articles, numberOfArticles] = await res.json();
  return { articles, numberOfArticles };
}

async function loadArticles(page) {
  const offset = (page - 1) * 30;
  const limit = 30;
  const { articles, numberOfArticles } = await queryArticles(offset, limit);
  const articlePlace = document.querySelector(
    '.article-table-section > table > tbody'
  );

  articles.map((article) => {
    articlePlace.insertAdjacentHTML(
      'afterbegin',
      `
      <tr id=article-${article.id}>
        <td>${article.id}</td>
        <td>${article.title}</td>
        <td>${article.author.nickname}</td>
        <td>${new Date(Date.parse(article.createdAt)).toLocaleString()}</td>
        <td>${article.likeCount}</td>
        <td>${article.viewCount}</td>
      </tr>
      `
    );
  });

  for (let i = offset + 1; i <= offset + numberOfArticles; i++) {
    const tr = document.querySelector(`#article-${i}`);
    tr.addEventListener('click', (event) => {
      location.href = `article.html?id=${i}`;
    });
  }
}

window.onload = () => {
  loadArticles(1);
};
