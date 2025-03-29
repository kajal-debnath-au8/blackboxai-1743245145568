document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Show loading spinner
        showLoading();

        // Simulate API call (will be replaced with actual fetch)
        setTimeout(() => {
            // In a real app, this would be a fetch to your backend API
            console.log('Login attempt:', { username, password });
            
            // Show success message
            showToast('Login successful!', 'success');
            
            // Reset form
            loginForm.reset();
            
            // Hide loading spinner
            hideLoading();
            
            // Redirect to home or dashboard
            window.location.href = '/';
        }, 2000);
    });
});