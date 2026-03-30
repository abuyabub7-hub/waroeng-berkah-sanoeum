// ==================== AUTHENTICATION SYSTEM ====================

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
        initApp();
        errorEl.style.display = 'none';
    } else {
        errorEl.style.display = 'block';
        setTimeout(() => { errorEl.style.display = 'none'; }, 3000);
    }
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        location.reload();
    }
}

// Handle Enter key on login form
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#username, #password');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') login();
        });
    });
});