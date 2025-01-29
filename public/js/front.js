const backColors = [
    "linear-gradient(to bottom right, #476C9D, #7497CF, #2E4C72)",
    "linear-gradient(to bottom right, #18283D, #2F4E75, #18283D)"
];
const footColor = ["#476C9D", "#18283D"];
const btnColor = ["#476C9D", "#18283D"];
const btnColor2 = ["#476C9D", "#284163"];
const inputColor = ["#FFFFFF", "#2C394A"];
const setColor = ["#7497CF", "#35547E"];
const containerColor = ["#FFFFFF", "#506682"];
const containerShadow = ["0px 4px 8px rgba(69, 101, 145, 0.5)", "0px 4px 8px rgba(31, 46, 65, 0.5)"];
const navlinkColor = ["#2E4C72", "#FFFFFF"];
const contactUsColor = ["#476C9D", "#FFFFFF"];

let currentColorIndex = 0;

function changeBackground() {
    currentColorIndex = (currentColorIndex + 1) % backColors.length;
    document.body.style.background = backColors[currentColorIndex];
    
    const footer = document.getElementById("myFooter");
    if (footer) footer.style.background = footColor[currentColorIndex];

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => btn.style.backgroundColor = btnColor[currentColorIndex]);

    const changeBtn = document.getElementById("changeBtn");
    if (changeBtn) changeBtn.style.backgroundColor = btnColor2[currentColorIndex];

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) logoutButton.style.backgroundColor = btnColor2[currentColorIndex];

    const cards = document.querySelectorAll('.custom-card');
    cards.forEach(card => {
        card.style.backgroundColor = containerColor[currentColorIndex];
        card.style.boxShadow = containerShadow[currentColorIndex];
        card.style.color = navlinkColor[currentColorIndex];
    });

    const additionalQuestion = document.getElementById("myAdditionalQuestion");
    if (additionalQuestion) additionalQuestion.style.backgroundColor = containerColor[currentColorIndex];
    
    const questionHeading = document.getElementById("myQuestionHandling");
    if (questionHeading) questionHeading.style.color = navlinkColor[currentColorIndex];

    const nameInput = document.getElementById("nameInput");
    if (nameInput) {
        nameInput.style.backgroundColor = inputColor[currentColorIndex];
        nameInput.style.color = navlinkColor[currentColorIndex];
    }

    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(accItem => {
        accItem.style.backgroundColor = containerColor[currentColorIndex];
        accItem.style.color = navlinkColor[currentColorIndex];
    });

    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(accBtn => {
        accBtn.style.backgroundColor = containerColor[currentColorIndex];
        accBtn.style.color = navlinkColor[currentColorIndex];
    });

    const greetingMessage = document.getElementById("greetingMessage");
    if (greetingMessage) greetingMessage.style.color = navlinkColor[currentColorIndex];

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(navLink => navLink.style.color = navlinkColor[currentColorIndex]);

    const navbar = document.getElementById('myNavbar');
    if (navbar) {
        if (navbar.classList.contains('navbar-light')) {
            navbar.classList.replace('navbar-light', 'navbar-dark');
            navbar.classList.replace('bg-light', 'bg-dark');
        } else {
            navbar.classList.replace('navbar-dark', 'navbar-light');
            navbar.classList.replace('bg-dark', 'bg-light');
        }
    }
}

const categories = document.querySelectorAll('.nav-item .nav-link');
categories.forEach(category => {
    category.addEventListener('click', (event) => {
        const selectedCategory = category.getAttribute('href');
        localStorage.setItem('selectedCategory', selectedCategory); // сохраняем выбранную категорию
        window.location.href = selectedCategory; // вручную перенаправляем на выбранную страницу
    });
});

const submitNameButton = document.getElementById('submitNameButton');
if (submitNameButton) {
    submitNameButton.addEventListener('click', () => {
        const name = document.getElementById('nameInput').value;
        const greetingMessage = document.getElementById('greetingMessage');
        if (greetingMessage) {
            greetingMessage.textContent = name.trim() ? `Hello, ${name}! Thank you for your question.` : 'Please enter your name.';
            greetingMessage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                greetingMessage.style.transform = 'scale(1)';
            }, 500);
        }
    });
}

document.addEventListener('keydown', (event) => {
    const categories = document.querySelectorAll('.nav-item .nav-link');
    let currentIndex = Array.from(categories).findIndex(item => document.activeElement === item);
    if (event.key === 'ArrowRight' && currentIndex < categories.length - 1) {
        categories[currentIndex + 1].focus();
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        categories[currentIndex - 1].focus();
    }
});

const logoutButtonElement = document.getElementById("logoutButton");
if (logoutButtonElement) {
    logoutButtonElement.addEventListener("click", () => {
        window.location.href = "/";
    });
}
document.getElementById('getWeatherButton').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    try {
        // Отправляем запрос к серверу
        const response = await fetch(`/api/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        // Проверяем, если есть ошибка
        if (data.error) {
            alert(data.error);
            return;
        }
        // Отображаем данные о погоде
        const weatherDisplay = document.getElementById('weatherDisplay');
        weatherDisplay.innerHTML = `
            <h3>Weather in ${data.city}, ${data.country}</h3>
            <img src="${data.icon}" alt="${data.weather_description}">
            <p><strong>Temperature:</strong> ${data.temperature}°C</p>
            <p><strong>Feels Like:</strong> ${data.feels_like}°C</p>
            <p><strong>Description:</strong> ${data.weather_description}</p>
            <p><strong>Coordinates:</strong> Latitude ${data.coordinates.lat}, Longitude ${data.coordinates.lon}</p>
            <p><strong>Humidity:</strong> ${data.humidity}%</p>
            <p><strong>Pressure:</strong> ${data.pressure} hPa</p>
            <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
});