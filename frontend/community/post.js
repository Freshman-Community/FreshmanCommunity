async function submitForm() {
  const formData = new URLSearchParams();
  formData.append('title', document.querySelector('#title').value);
  formData.append('content', document.querySelector('#content').value);
  formData.append('anonymity', document.querySelector('#anonymity').checked);
  const post = await fetch('https://seheon.email/api/articles', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
    credentials: 'include',
    mode: 'cors',
    headers: {
      cookie: `SESSION_ID=${window.localStorage.getItem('FRESH_SESSIONID')}`,
    },
  });
  if (post.ok) location.replace(document.referrer);
  else if (post.status === 403) {
    alert('로그인이 필요합니다.');
    location.replace('./main/signin.html');
  } else {
    alert(post.statusText);
    location.replace(document.referrer);
  }
}

window.onload = async () => {
  const user = await fetch('https://seheon.email/api/users/me', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      cookie: `SESSION_ID=${window.localStorage.getItem('FRESH_SESSIONID')}`,
    },
  });
  if (user.ok) {
    document
      .querySelector('button.submit')
      .addEventListener('click', (event) => submitForm());
    document
      .querySelector('button.cancle')
      .addEventListener('click', (event) => history.back());
  } else {
    alert('로그인이 필요합니다.');
    parent.location.replace('./main/signin.html');
  }
};
