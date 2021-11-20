function queryArticles(offset, limit) {
  const articles = fetch(
    `/api/article/general?offset=${offset}&limit=${limit}`,
  );
  return articles.then((res) => res.json());
}

async function loadArticles(page) {
  const { articles, numberOfArticles } = await queryArticles(
    (page - 1) * 10,
    10,
  );
  const articlePlace = document.querySelector('#article-place');

  articlePlace.innerHTML = `
    ${articles
      .map(
        (article) => `
          <div class="article" article-id="${article.id}">
            <span class="title">${article.title}</span>
            <span class="author">${article.nickname}</span>
            <p class="content">${article.content}</p>
          </div>
        `,
      )
      .join('')}
    <div class="navigator">
      ${(() => {
        let navigatorHtml = '';
        for (let i = 1; i < numberOfArticles / 10 + 1; i++) {
          if (page == i) {
            navigatorHtml += `<div class="page"><b>${i}</b><div class="page">`;
          } else {
            navigatorHtml += `<div class="page">${i}<div class="page">`;
          }
        }
        return navigatorHtml;
      })()}
    </div>
  `;
}
