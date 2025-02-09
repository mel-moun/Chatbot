document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const form = document.getElementById('authForm');
    const nameField = document.getElementById('nameField');
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const submitText = document.getElementById('submitText');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleText = document.getElementById('toggleText');

    let isSignIn = true;

    // Toggle between sign in and sign up
    function toggleMode() {
        isSignIn = !isSignIn;
        
        // Update form visibility
        nameField.classList.toggle('hidden');
        
        // Update text content
        title.textContent = isSignIn ? 'Welcome Back' : 'Create Account';
        subtitle.textContent = isSignIn 
            ? 'Enter your credentials to access your account'
            : 'Join us and experience the future of AI chat';
        submitText.textContent = isSignIn ? 'Sign In' : 'Create Account';
        toggleText.textContent = isSignIn ? "Don't have an account?" : "Already have an account?";
        toggleBtn.textContent = isSignIn ? 'Sign Up' : 'Sign In';

        // Add fade animation to form groups
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.animation = 'none';
            group.offsetHeight; // Trigger reflow
            group.style.animation = `fadeIn 0.4s ease-out forwards ${index * 0.1}s`;
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        // Handle authentication here
        console.log(isSignIn ? 'Signing in...' : 'Signing up...', {
            email,
            password,
            ...(isSignIn ? {} : { name })
        });
    });

    // Toggle button click handler
    toggleBtn.addEventListener('click', toggleMode);

    // Add hover animation to submit button icon
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('mouseover', () => {
        const icon = submitBtn.querySelector('svg');
        icon.style.transform = 'rotate(12deg)';
    });
    submitBtn.addEventListener('mouseout', () => {
        const icon = submitBtn.querySelector('svg');
        icon.style.transform = 'rotate(0deg)';
    });
});
