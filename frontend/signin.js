function checkEmpty(name) {
  const elems = document.getElementsByName(name);

  elems.forEach((elem) => {
    console.log(elem.value);
    if (elem.value) elem.classList.add('inserted');
    else elem.classList.remove('inserted');
  });
}

function checkValidate() {}
