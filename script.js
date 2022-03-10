const errormessages = [];
const userData = {};

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector('.form__message');
    messageElement.textContent = message;
    messageElement.classList.remove('form__message--success', 'form__message--error');
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add('form__input--error');
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = message;
    errormessages.push(message);
}

function clearInputError(inputElement, message) {
    inputElement.classList.remove('form__input--error');
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = '';
    if (errormessages.includes(message)) {
        const i = errormessages.indexOf(message);
        errormessages.splice(i, 1);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login');
    let loginName;
    let loginPassword;
    const createAccount = document.querySelector('#create-account');
    const loginSuccess = document.querySelector('#login__success');
    const signUpSuccess = document.querySelector('#sign-up__success');
    let userName;
    let email;
    let password;
    let confirmPassword;
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        //Perform AJAX/Fetch login here
        if (loginName && (loginName === userData.userName || loginName === userData.email) && loginPassword === userData.password) {
            loginForm.classList.add('form--hidden');
            loginSuccess.classList.remove('form--hidden');
        } else{
            setFormMessage(loginForm, 'error', 'Invalid username/password combination');
        }
    });
    document.querySelector('#link-create-account').addEventListener('click', e => {
        e.preventDefault();
        loginForm.classList.add('form--hidden');
        createAccount.classList.remove('form--hidden');
    });
    document.querySelector('#link-login').addEventListener('click', e => {
        e.preventDefault();
        loginForm.classList.remove('form--hidden');
        createAccount.classList.add('form--hidden');
    });
    createAccount.addEventListener('submit', e => {
        e.preventDefault();
        if (errormessages.length === 0) {
            userData.userName = userName;
            userData.email = email;
            userData.password = password;
            createAccount.classList.add('form--hidden');
            signUpSuccess.classList.remove('form--hidden');
        }
    });
    document.querySelector('#sign-in').addEventListener('click', e => {
        e.preventDefault();
        signUpSuccess.classList.add('form--hidden');
        loginForm.classList.remove('form--hidden');
    });
    document.querySelectorAll('.form__input').forEach(inputElement => {
        inputElement.addEventListener('blur', e => {
            loginName = document.querySelector('#login-name').value;
            loginPassword = document.querySelector('#login-password').value;
            userName = document.getElementById('signup-username').value;
            email = document.getElementById('signup-email').value;
            if (e.target.id === 'signup-username' && e.target.value.trim().length >= 0 && (e.target.value.trim().length < 4 || e.target.value.trim().length > 10)) {
                setInputError(inputElement, 'Username must be at least 4 or more characters and less than 10 characters in length');
            }
            password = document.getElementById('signup-password').value;
            confirmPassword = document.getElementById('confirm-password').value;
            if (e.target.id === 'signup-password' && e.target.value.trim().length >= 0 && (e.target.value.trim().length < 8 || e.target.value.trim().length > 15)) {
                setInputError(inputElement, 'Password must be at least 8 or more characters and less than 15 characters in length');
            }
            if (confirmPassword) {
                if (e.target.id === 'signup-password' && password !== confirmPassword) {
                    setInputError(inputElement, `Password doesn't match!`);
                }
            }
            confirmPassword = document.getElementById('confirm-password').value;
            if (e.target.id === 'confirm-password' && confirmPassword !== password) {
                setInputError(inputElement, `Password doesn't match!`);
            }
        });
        inputElement.addEventListener('focus', e => {
            switch (e.target.id) {
                case 'signup-username':
                    clearInputError(inputElement, 'Username must be at least 4 or more characters and less than 10 characters in length');
                    break;
                case 'signup-password':
                    clearInputError(inputElement, 'Password must be at least 8 or more characters and less than 15 characters in length');
                    break;
                case 'confirm-password':
                    clearInputError(inputElement, `Password doesn't match!`);
                    break;
            }
        });
    });
});