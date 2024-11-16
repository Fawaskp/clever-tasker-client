document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const submitButton = document.getElementById('signup-submit-btn');
        const buttonText = document.getElementById('signup-submit-btn-text');
        const loadingSpinner = document.getElementById('signup-submit-loader');

        buttonText.classList.add('hidden')
        loadingSpinner.classList.remove('hidden')
        submitButton.disabled = true

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
                alert('Sign Up Successful, You can Log in!');
                window.location.href = '/login.html';  
            } else {
                alert(result.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.log('Error during sign up:', error);
            alert('An error occurred. Please try again.');
        }finally{
            buttonText.classList.remove('hidden')
          loadingSpinner.classList.add('hidden')
          submitButton.disabled = false
          }
    });
});