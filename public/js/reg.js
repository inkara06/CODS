document.addEventListener("DOMContentLoaded", function() {
    setupFormHandlers();
});

function setupFormHandlers() {
    const registrationForm = document.getElementById("registrationForm");
    const resetButton = document.getElementById("resetButton");
    const loginForm = document.getElementById("contactForm");

    if (registrationForm) {
        registrationForm.addEventListener("submit", handleRegistration);
    }

    if (resetButton) {
        resetButton.addEventListener("click", function() {
            registrationForm.reset();
            document.querySelectorAll(".error").forEach(function(error) {
                error.textContent = "";
            });
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    if (localStorage.getItem('session') === 'active') {
        const signInBtn = document.querySelector('.sign-in-btn');
        if (signInBtn) {
            signInBtn.textContent = 'Log out';
            signInBtn.addEventListener('click', logout);
        }
    }
}
function handleRegistration(event) {
    event.preventDefault();
    let valid = true;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    valid &= setError("usernameError", username === "", "Username is required");
    valid &= setError("emailError", !email.includes('@'), "Please enter a valid email");
    valid &= setError("passwordError", password.length < 6, "Password must be at least 6 characters long");
    valid &= setError("confirmPasswordError", confirmPassword !== password, "Passwords do not match");

    if (valid) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        .then(response => {
            if (response.ok) {
                alert("Registration successful! You can now log in.");
                window.location.href = '/login';
            } else {
                response.text().then(text => alert(`Error: ${text}`));
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (response.ok) {
            alert("Login successful!");
            window.location.href = '/front';
        } else {
            response.text().then(text => alert(`Error: ${text}`));
        }
    })
    .catch(error => console.error('Error:', error));
}

function logout() {
    localStorage.removeItem('session');
    alert("You have logged out.");
    window.location.href = '/';
}

function setError(fieldId, condition, message) {
    const errorElement = document.getElementById(fieldId);
    if (condition) {
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    // Сохранение данных пользователя в localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

});