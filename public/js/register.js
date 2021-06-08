const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const namErr = document.querySelector('.namErr');
    const emailErr = document.querySelector('.emailErr');
    const passErr = document.querySelector('.passErr');
    const cpassErr = document.querySelector('.cpassErr');
    namErr.style.display = 'none';
    emailErr.style.display = 'none';
    passErr.style.display = 'none';
    cpassErr.style.display = 'none';
    if (name == '' || name == null) {
        namErr.style.display = 'block';
        namErr.style.color = 'red'
        namErr.textContent = 'name is required'
        e.preventDefault();
    }
    if (email == '' || email == null) {
        emailErr.style.display = 'block';
        emailErr.style.color = 'red'
        emailErr.textContent = 'email is required'
        e.preventDefault();
    }
    if (password == '' || password == null) {
        passErr.style.color = 'red'
        emailErr.style.display = 'block';
        passErr.textContent = 'password is required'
        e.preventDefault();
    }
    if (confirmPassword == '' || confirmPassword == null) {
        cpassErr.style.color = 'red';
        cpassErr.style.display = 'block';
        cpassErr.textContent = 'confirm password is required'
        e.preventDefault();
    }
    if (confirmPassword.length < 6) {
        cpassErr.style.display = 'block';
        cpassErr.style.color = 'red'
        cpassErr.textContent = 'minimum 6 charecture password is required'
        e.preventDefault();
    }
    if (password.length < 6) {
        passErr.style.color = 'red'
        passErr.style.display = 'block';
        passErr.textContent = 'minimum 6 charecture password is required'
        e.preventDefault();
    }
    if (password !== confirmPassword) {
        passErr.style.color = 'red'
        cpassErr.style.display = 'block';
        passErr.style.display = 'block';
        cpassErr.style.color = 'red'
        passErr.textContent = 'confirm password and password must be same '
        cpassErr.textContent = 'confirm password and password must be same '
        e.preventDefault();
    }
})