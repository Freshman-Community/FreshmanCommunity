async function logout() {
  const logoutQuery = await fetch('/api/users/logout', {
    credentials: 'same-origin',
  });
  if (logoutQuery.status === 200) location.reload();
}

async function checkLogin() {
  const signinDiv = document.querySelector('.sign-in');
  const signupDiv = document.querySelector('.sign-up');
  const user = await fetch('/api/users/me', { credentials: 'same-origin' });

  if (user.ok) {
    signinDiv.innerHTML = (await user.json()).nickname;
    signupDiv.innerHTML = '<a onClick="logout()">로그아웃</a>';
  } else {
    signinDiv.innerHTML = '<a href="/main/signin.html">로그인</a>';
    signupDiv.innerHTML = '<a href="/main/signup.html">회원가입</a>';
  }
}

window.onload = checkLogin;