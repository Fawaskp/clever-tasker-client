const AUTH_API_URL = 'http://localhost:8000/auth/api'
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('confirm-password').value;

        if (!name || !email || !password || !password2) {
            alert('All fields are required!');
            return;
        }

        const formData = {
            name: name,
            email: email,
            password: password,
            password2: password2,
        };

        try {
            const response = await fetch(`${AUTH_API_URL}/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Sign Up Successful!');
                window.location.href = '/login.html';  
            } else {
                alert(result.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.log('Error during sign up:', error);
            alert('An error occurred. Please try again.');
        }
    });
});