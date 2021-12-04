async function queryArticles(offset, limit) {
  const res = await fetch(`/api/articles?offset=${offset}&limit=${limit}`);
  const [articles, numberOfArticles] = await res.json();
  return { articles, numberOfArticles };
}

async function loadArticles(page) {
  const { articles } = await queryArticles((page - 1) * 30, 30);
  const articlePlace = document.querySelector(
    '.article-table-section > table > tbody'
  );

  articlePlace.innerHTML = `
    ${articles
      .map(
        (article) => `
          <tr id=${article.id}>
            <td>${article.id}</td>
            <td>${article.title}</td>
            <td>${article.author.nickname}</td>
            <td>${new Date(
              Date.parse(article.createdAt)
            ).toLocaleDateString()}</td>
            <td>${article.likeCount}</td>
            <td>${article.viewCount}</td>
          </tr>
        `
      )
      .join('')}
  `;
}

window.onload = () => {
  loadArticles(1);
};
