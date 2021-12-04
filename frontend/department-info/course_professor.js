async function thumbUpDown(professorId) {
  const res = await fetch(
    `http://seheon.email/api/professor-likes/${professorId}`,
    {
      method: 'post',
      credentials: 'include',
    }
  );
  const post = await res.json();
  if (typeof post === 'boolean' || post.ok) location.reload();
  else if (post.statusCode === 403) {
    alert('로그인이 필요합니다.');
    parent.parent.location.replace('./main/signin.html');
  } else {
    alert(post.statusText);
    location.replace(document.referrer);
  }
}

async function getThumbs(professorId) {
  const res = await fetch(
    `http://seheon.email/api/professor-likes/${professorId}`
  );
  const post = await res.json();
  if (typeof post === 'number' || post.ok) return post;
  else {
    alert(post.statusText);
    location.replace(document.referrer);
  }
}

window.onload = async () => {
  const thumbButtons = document.querySelectorAll('button');
  thumbButtons.forEach((value, index, parent) =>
    value.addEventListener('click', async (event) => await thumbUpDown(index))
  );
  const thumbResults = document.querySelectorAll('strong');
  thumbResults.forEach(
    async (value, index, parent) => (value.innerHTML = await getThumbs(index))
  );
};
