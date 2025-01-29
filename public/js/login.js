document.addEventListener("DOMContentLoaded", function() {
    setupFormValidation();
    handleLoginForm();
    handleRegisterButton();
    checkUserSession();
});

function setupFormValidation() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        // Валидация перед отправкой
        if (!validateLoginForm()) {
            event.preventDefault(); // Блокируем отправку, если форма не валидна
        }
    });

    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', function() {
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
    });
}
function performLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = '/front'; // Перенаправление после успешного входа
            } else {
                response.text().then((text) => {
                    alert(text); // Показываем сообщение об ошибке
                });
            }
        })
        .catch((err) => {
            console.error('Error during login:', err);
        });
}1

function validateLoginForm() {
    let valid = true;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    if (!email.includes('@')) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.color = 'red';
        valid = false;
    } else {
        emailError.textContent = '';
    }

    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long';
        passwordError.style.color = 'red';
        valid = false;
    } else {
        passwordError.textContent = '';
    }
    return valid;
}


function handleRegisterButton() {
    const registerButton = document.getElementById("registerButton");
    registerButton.addEventListener("click", function() {
        window.location.href = '/register';
    });
}

function checkUserSession() {
    if (localStorage.getItem('session') === 'active') {
        const signInBtn = document.querySelector('.sign-in-btn');
        if (signInBtn) {
            signInBtn.textContent = 'Log out';
            signInBtn.addEventListener('click', logout);
        }
    }
}

function logout() {
    localStorage.removeItem('session');
    alert("You have logged out.");
    window.location.href = '/';
}
function handleRegisterButton() {
    const registerButton = document.getElementById("registerButton");
    registerButton.addEventListener("click", function() {
        window.location.href = '/register'; // Убедитесь, что путь к файлу reg.html корректен
    });
}

document.addEventListener("DOMContentLoaded", function() {
    handleRegisterButton();
});
