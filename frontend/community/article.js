function getArticleId() {
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

async function queryArticle(articleId) {
  const res = await fetch(`http://seheon.email/api/articles/${articleId}`);
  return await res.json();
}

async function loadArticle(articleId) {
  const article = await queryArticle(articleId);

  document.querySelector(
    'h1.title'
  ).innerHTML = `${article.title} <span class='article-id'>${article.id}</span>`;

  document.querySelector('span.author').innerHTML = article.author.nickname;
  document.querySelector('span.create-at').innerHTML = new Date(
    Date.parse(article.createdAt)
  ).toLocaleString();

  document.querySelector(
    'span.view-count'
  ).innerHTML = `${article.viewCount} views`;
  document.querySelector(
    'span.like-count'
  ).innerHTML = `${article.likeCount} likes`;
  document.querySelector('article.main-content > p').innerHTML =
    article.content;
}

async function queryComment(articleId) {
  const res = await fetch(`http://seheon.email/api/comments/${articleId}`);
  const [comments, numberOfComments] = await res.json();
  return { comments, numberOfComments };
}

async function loadComment(articleId) {
  const { comments, numberOfComments } = await queryComment(articleId);
  if (!comments) return;

  const commentPlace = document.querySelector('article.main-content');
  comments
    .slice(0)
    .reverse()
    .map((comment) => {
      commentPlace.insertAdjacentHTML(
        'afterend',
        `
        <article class="comment">
          <header>
            <div class="author">
              <span class="author">${comment.writer.nickname}</span>
              <span class="create-at">${new Date(
                Date.parse(comment.createdAt)
              ).toLocaleString()}</span>
            </div>
            <div class="counts">
              <span class="like-count">${comment.likeCount} likes</span>
              <span class="like-button" comment-id="${comment.id}">♥️</span>
            </div>
          </header>
          <p>
            ${comment.content}
          </p>
        </article>
      `
      );
    });
}

async function postComment(articleId) {
  const commentData = new URLSearchParams();
  commentData.append('content', document.querySelector('#content').value);
  commentData.append('anonymity', document.querySelector('#anonymity').checked);
  commentData.append('articleId', articleId);
  const post = await fetch('http://seheon.email/api/comments/', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: commentData,
    credentials: 'include',
  });
  if (post.ok) location.reload();
  else if (post.status === 403) {
    alert('로그인이 필요합니다.');
    parent.location.replace('./main/signin.html');
  } else {
    alert(post.statusText);
    location.replace(document.referrer);
  }
}

async function likeUpArticle(articleId) {
  try {
    const res = await fetch(
      `http://seheon.email/api/article-likes/${articleId}`,
      {
        credentials: 'include',
      }
    );
    const post = await res.json();
    if (typeof post === 'boolean' || post.ok) location.reload();
    else if (post.statusCode === 403) {
      alert('로그인이 필요합니다.');
      parent.location.replace('./main/signin.html');
    } else {
      alert(post.statusText);
      location.replace(document.referrer);
    }
  } catch (error) {
    console.error(error);
  }
}

async function likeUpComment(commentId) {
  const res = await fetch(
    `http://seheon.email/api/comment-likes/${commentId}`,
    {
      credentials: 'include',
    }
  );
  const post = await res.json();
  if (typeof post === 'boolean' || post.ok) location.reload();
  else if (post.statusCode === 403) {
    alert('로그인이 필요합니다.');
    parent.location.replace('./main/signin.html');
  } else {
    alert(post.statusText);
    location.replace(document.referrer);
  }
}

window.onload = async () => {
  const articleId = getArticleId();
  if (!articleId) {
    alert('존재하지 않는 글입니다.');
    history.back();
  }

  const postButton = document.querySelector('button.submit');
  postButton.addEventListener('click', (event) => postComment(articleId));
  const likeArticleButton = document.querySelector(
    '.main-content .like-button'
  );
  likeArticleButton.addEventListener('click', (event) =>
    likeUpArticle(articleId)
  );

  await loadArticle(articleId);
  await loadComment(articleId);

  const likeCommentsButtons = document.querySelectorAll(
    '.comment .like-button'
  );
  likeCommentsButtons.forEach((value, key, parent) => {
    value.addEventListener('click', (event) =>
      likeUpComment(value.attributes.getNamedItem('comment-id').value)
    );
  });
};
