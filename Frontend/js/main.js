document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleText = document.getElementById('toggleText');
    const title = document.getElementById('title');
    const submitText = document.getElementById('submitText');
    const nameField = document.getElementById('nameField');
    const nameInput = document.getElementById('name');

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
            submitText.textContent = "Sign Up";
            toggleText.textContent = "Already have an account?";
            toggleBtn.textContent = "Sign In";
            nameField.classList.remove('hidden');
        }
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = isLogin ? null : nameInput.value;

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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.access) {
                console.log(`${isLogin ? 'Logged in' : 'Registered'} successfully`, data);
                
                if (isLogin) {
                    localStorage.setItem('username', email); 
                    window.location.href = 'welcome.html';
                }
            } else {
                console.error(`${isLogin ? 'Login' : 'Registration'} failed`, data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
