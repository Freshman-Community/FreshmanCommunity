function checkEmpty(name) {
  const elems = document.getElementsByName(name);

  elems.forEach((elem) => {
    if (elem.value) elem.classList.add('inserted');
    else elem.classList.remove('inserted');
  });
}

async function validateUsername() {
  const username = document.querySelector('#username');
  const exist = await fetch(
    `http://seheon.email/api/users/exist/${username.value}`
  );
  if ((await exist.json()) === false) {
    username.classList.add('warning');
    return false;
  } else {
    username.classList.remove('warning');
    return true;
  }
}

function validateSignin() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  if (username === '') alert('아이디를 입력해주세요.');
  else if (password === '') alert('비밀번호를 입력해주세요.');
  else return true;
  return false;
}

async function validateSignup() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const rePassword = document.querySelector('#re-password').value;
  const nickname = document.querySelector('#nickname').value;
  const major = document.querySelector('#major').value;
  const enteredYear = document.querySelector('#entered-year').value;

  if (username === null) alert('아이디를 입력해주세요.');
  else if (password === null) alert('비밀번호를 입력해주세요.');
  else if (rePassword === null) alert('확인 비밀번호를 입력해주세요.');
  else if (nickname === null) alert('닉네임을 입력해주세요.');
  else if (major === '') alert('학과를 입력해주세요.');
  else if (enteredYear === '') alert('학번을 입력해주세요.');
  else if (!(await this.validateUsername()))
    alert('이미 존재하는 아이디입니다.');
  else if (password !== rePassword)
    alert('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
  else return true;
  return false;
}

async function trySignin() {
  if (!validateSignin()) return false;

  const signinData = new URLSearchParams();
  signinData.append('username', document.querySelector('#username').value);
  signinData.append('password', document.querySelector('#password').value);
  const signin = await fetch('http://seheon.email/api/users/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: signinData,
  });
  if (signin.ok) location.replace('./app.html');
  else {
    alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
    document.querySelector('#username').innerHTML = '';
    document.querySelector('#password').innerHTML = '';
    return false;
  }
}

async function trySignup() {
  if (!(await validateSignup())) return false;

  const signupData = new URLSearchParams();
  signupData.append('username', document.querySelector('#username').value);
  signupData.append('password', document.querySelector('#password').value);
  signupData.append('nickname', document.querySelector('#nickname').value);
  signupData.append('major', document.querySelector('#major').value);
  signupData.append(
    'enteredYear',
    document.querySelector('#entered-year').value
  );
  const signup = await fetch('http://seheon.email/api/users', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: signupData,
  });
  if (signup.ok) {
    alert('회원가입이 완료되었습니다. 로그인해주세요.');
    location.replace('./main/signin.html');
  } else {
    alert(
      '회원가입이 처리되지 않았습니다. 입력 데이터를 다시 한 번 확인해주세요.'
    );
    return false;
  }
}
