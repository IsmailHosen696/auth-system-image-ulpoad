const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    const email = form.email.value;
    const password = form.password.value;
    const emailErr = document.querySelector('.emailErr');
    const passErr = document.querySelector('.passErr');

    emailErr.style.display = 'none';
    passErr.style.display = 'none';

    if (email == '' || email == null) {
        emailErr.style.display = 'block';
        emailErr.style.color = 'red'
        emailErr.textContent = 'email is required'
        e.preventDefault();
    }
    if (password == '' || password == null) {
        passErr.style.color = 'red'
        passErr.style.display = 'block';
        passErr.textContent = 'password is required'
        e.preventDefault();
    }
})