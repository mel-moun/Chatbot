document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleText = document.getElementById('toggleText');
    const title = document.getElementById('title');
    const submitText = document.getElementById('submitText');
    const nameField = document.getElementById('nameField');
    const nameInput = document.getElementById('name');

    let isLogin = true;

    // Toggle between login and signup forms
    if (toggleBtn) {
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
    }

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = isLogin ? null : nameInput.value;

            // Validate inputs before submitting
            if (!isLogin) {
                if (!name || name.trim() === "") {
                    alert("Name is required for registration.");
                    return;
                }
                if (!isValidPassword(password)) {
                    alert("Password is too weak. It should contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.");
                    return;
                }
            }

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

                    // Save tokens and email regardless of login or signup
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    localStorage.setItem('username', email);

                    // Redirect directly to chatbot after signup or login
                    window.location.href = 'chatbot.html';

                } else {
                    if (data.email && data.email[0].includes('unique')) {
                        alert("This email is already registered. Please log in.");
                    } else if (data.password && data.password[0].includes('password')) {
                        alert("The password is too weak. Please choose a stronger one.");
                    } else {
                        console.error(`${isLogin ? 'Login' : 'Registration'} failed`, data);
                        alert("Something went wrong. Please try again.");
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Network error, please try again later.");
            });
        });
    }

    // Password strength validation function
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    // Chatbot logic
    const chatForm = document.getElementById('chat-form');
    const chatbox = document.getElementById('chatbox');
    const messageInput = document.getElementById('message');
    const sendBtn = document.getElementById('sendBtn');
    const logoutBtn = document.getElementById('logoutBtn');    

    // 🆕 Disable autocomplete for the chat form and message input
    if (chatForm) {
        chatForm.setAttribute('autocomplete', 'off');
    }
    if (messageInput) {
        messageInput.setAttribute('autocomplete', 'off');
    }

    function addMessage(text, sender = "bot") {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}-message`;
        messageEl.innerHTML = text;
        chatbox.appendChild(messageEl);

        // Ensure scroll happens after the message is appended
        setTimeout(() => {
            chatbox.scrollTop = chatbox.scrollHeight - messageEl.offsetHeight - 20;
        }, 100);
    }

    if (chatbox) {
        // Clear previous messages if any
        chatbox.innerHTML = '';

        // Add welcome message
        addMessage("Hello! I'm your AI assistant 🤖<br>Ask me anything!", "bot");
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (!message) return;

            // Show user's message
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = message;
            chatbox.appendChild(userMessage);

            // Clear input
            messageInput.value = '';

            // Scroll to the top of the last message with a slight offset (20px)
            setTimeout(() => {
                chatbox.scrollTop = chatbox.scrollHeight - userMessage.offsetHeight - 20;
            }, 100);

            // Send message to the bot
            fetch('http://127.0.0.1:8000/api/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(res => res.json())
            .then(data => {
                const botReply = document.createElement('div');
                botReply.className = 'message bot-message';
                botReply.textContent = data.response;
                chatbox.appendChild(botReply);

                // Scroll to the top of the last bot message with a slight offset (20px)
                setTimeout(() => {
                    chatbox.scrollTop = chatbox.scrollHeight - botReply.offsetHeight - 20;
                }, 100);
            })
            .catch(err => {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'message error-message';
                errorMsg.textContent = 'Error connecting to chatbot.';
                chatbox.appendChild(errorMsg);

                // Scroll to the latest error message with a slight offset (20px)
                setTimeout(() => {
                    chatbox.scrollTop = chatbox.scrollHeight - errorMsg.offsetHeight - 20;
                }, 100);
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear(); 
            window.location.href = 'login.html';
        });
    }
    
    if (window.location.pathname.includes('chatbot.html')) {
        const username = localStorage.getItem('username');
        if (!username) {
            window.location.href = 'login.html';
        }
    }
});
