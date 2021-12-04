async function submitForm() {
  const formData = new URLSearchParams();
  formData.append('title', document.querySelector('#title').value);
  formData.append('content', document.querySelector('#content').value);
  formData.append('anonymity', document.querySelector('#anonymity').checked);
  const post = await fetch('/api/articles', {
    method: 'post',
    headersL: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
    credentials: 'same-origin',
  });
  if (post.ok) location.replace(document.referrer);
  else if (post.status === 403) {
    alert('로그인이 필요합니다.');
    location.replace('/main/signin.html');
  } else {
    alert(post.statusText);
    location.replace(document.referrer);
  }
}

window.onload = async () => {
  const user = await fetch('/api/users/me', { credentials: 'same-origin' });
  if (user.ok) {
    document
      .querySelector('button.submit')
      .addEventListener('click', (event) => submitForm());
    document
      .querySelector('button.cancle')
      .addEventListener('click', (event) => history.back());
  } else {
    alert('로그인이 필요합니다.');
    parent.location.replace('/main/signin.html');
  }
};
