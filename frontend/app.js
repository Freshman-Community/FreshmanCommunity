async function logout() {
  const logoutQuery = await fetch('http://seheon.email/api/users/logout', {
    credentials: 'include',
  });
  if (logoutQuery.status === 200) location.reload();
}

async function generateRandomTip() {
  const res = await fetch('http://seheon.email/api');
  const tip = await res.json();
  const tipSpan = document.querySelector('div.tip > span');
  tipSpan.innerHTML = tip.tip;
  setTimeout(generateRandomTip, 10000);
}

async function checkLogin() {
  const signinDiv = document.querySelector('.sign-in');
  const signupDiv = document.querySelector('.sign-up');
  const user = await fetch('http://seheon.email/api/users/me', {
    credentials: 'include',
  });

  if (user.ok) {
    signinDiv.innerHTML = (await user.json()).nickname;
    signupDiv.innerHTML = '<a onClick="logout()">로그아웃</a>';
  } else {
    signinDiv.innerHTML = '<a href="/main/signin.html">로그인</a>';
    signupDiv.innerHTML = '<a href="/main/signup.html">회원가입</a>';
  }
}

window.onload = async () => {
  await generateRandomTip();
  await checkLogin();
};
