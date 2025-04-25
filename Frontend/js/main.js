
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

    if (authForm) {
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
                        window.location.href = 'chatbot.html';
                    } else {
                        window.location.href = 'login.html';
                    }
                } else {
                    console.error(`${isLogin ? 'Login' : 'Registration'} failed`, data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    //  Chatbot logic
    const chatForm = document.getElementById('chat-form');
	const chatbox = document.getElementById('chatbox');
	const messageInput = document.getElementById('message');
	const logoutBtn = document.getElementById('logoutBtn');	

	function addMessage(text, sender = "bot") {
		const messageEl = document.createElement('div');
		messageEl.className = `message ${sender}-message`;
		messageEl.innerHTML = text;
		chatbox.appendChild(messageEl);
		chatbox.scrollTop = chatbox.scrollHeight;
	}

	if (chatbox) {
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

				// Auto-scroll to bottom
				chatbox.scrollTop = chatbox.scrollHeight;
			})
			.catch(err => {
				const errorMsg = document.createElement('div');
				errorMsg.className = 'message error-message';
				errorMsg.textContent = 'Error connecting to chatbot.';
				chatbox.appendChild(errorMsg);
			});
		});
	}

	if (logoutBtn) {
		logoutBtn.addEventListener('click', () => {
			localStorage.clear(); 
			window.location.href = 'login.html'; // redirect to login page
		});
	}
	if (window.location.pathname.includes('chatbot.html')) {
		const username = localStorage.getItem('username');
		if (!username) {
			window.location.href = 'login.html';
		}
	}
	

});
