function getArticleId() {\
  const currentUrl = unescape(location.href);
  const parameters = currentUrl
    .slice(currentUrl.indexOf('?') + 1, currentUrl.length)
    ?.split('&');
  for (const parameter of parameters) {
    const pair = parameter.split('=');
    if (pair[0] === 'id') return pair[1];
  }
  return null;
}

window.onload = () => {
  const articleId = getArticleId();
  const articleIdSpan = document.querySelector('span.article-id');

  articleIdSpan.innerHTML = articleId;
};
