function signInWithGoogle() {
    // Add Google sign-in functionality
    console.log("Signing in with Google");
}

function signInWithFacebook() {
    // Add Facebook sign-in functionality
    console.log("Signing in with Facebook");
}

// JavaScript form validation
const form = document.getElementById('signInForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Your validation logic here
   
    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    // If validation passes, you can submit the form
    // form.submit();
    console.log('Form submitted:', { username, password });
});
