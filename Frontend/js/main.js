document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleText = document.getElementById('toggleText');

    let isLogin = true;

    toggleBtn.addEventListener('click', () => {
        isLogin = !isLogin;

        if (isLogin) {
            title.textContent = "Welcome Back";
            submitText.textContent = "Sign In";
            toggleText.textContent = "Don't have an account?";
            toggleBtn.textContent = "Sign Up";
            nameField.classList.add('hidden');
        } else {
            title.textContent = "Create an Account";
            nameField.classList.remove('hidden');
        }
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;

        const data = {
            email: email,
            password: password,
            ...(isLogin ? {} : { name: name })
        };

        console.log('Request Data:', data);

        const url = isLogin 
            ? 'http://127.0.0.1:8000/api/users/login/' 
            : 'http://127.0.0.1:8000/api/users/register/';

        fetch(url, {
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        })
    });
});
