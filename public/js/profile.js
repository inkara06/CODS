const backColors = [
    "linear-gradient(to bottom right, #476C9D, #7497CF, #2E4C72)",
    "linear-gradient(to bottom right, #18283D, #2F4E75, #18283D)"
];
const footBtnColor = ["#476C9D", "#18283D"];
const setColor = ["#7497CF", "#35547E"];
const containerColor = ["#FFFFFF", "#506682"];
const navlinkColor = ["#2E4C72", "#FFFFFF"];
const btnColor2 = ["#476C9D", "#284163"];

let currentColorIndex = 0;

/* Change Background */
function changeBackground() {
    currentColorIndex++;

    if (currentColorIndex >= backColors.length) {
        currentColorIndex = 0;
    }

    document.body.style.background = backColors[currentColorIndex];
    document.getElementById("myFooter").style.background = footBtnColor[currentColorIndex];

    const buttons = document.getElementsByClassName('btn');
    Array.from(buttons).forEach(btn => btn.style.backgroundColor = footBtnColor[currentColorIndex]);
    document.getElementById("changeBtn").style.backgroundColor = btnColor2[currentColorIndex];
    document.getElementById("logoutButton").style.backgroundColor = btnColor2[currentColorIndex];

    const conytainerName = document.getElementsByClassName('container_name');
    Array.from(conytainerName).forEach(contName => contName.style.backgroundColor = footBtnColor[currentColorIndex]);

    const settings = document.getElementsByClassName('set');
    Array.from(settings).forEach(set => set.style.backgroundColor = setColor[currentColorIndex]);

    const conteiners = document.getElementsByClassName('col');
    Array.from(conteiners).forEach(col => col.style.backgroundColor = containerColor[currentColorIndex]);

    document.getElementById("fig_name").style.color = navlinkColor[currentColorIndex];

    const menuText = document.getElementsByClassName('nav-link');
    Array.from(menuText).forEach(navLink => navLink.style.color = navlinkColor[currentColorIndex]);
}

/* Load User Profile */
async function loadProfile() {
    try {
        const response = await fetch('/profile/data'); // Запрос данных пользователя
        if (!response.ok) throw new Error('Failed to fetch profile data');

        const user = await response.json();
        document.getElementById('fig_name').textContent = user.username || 'Unknown';
        document.getElementById('fig_email').textContent = user.email || 'Unknown';
    } catch (err) {
        console.error('Error loading profile:', err);
    }
}

/* Logout Handler */
function handleLogout() {
    fetch('/logout', { method: 'POST' }) // Реализовать маршрут /logout на сервере
        .then(() => {
            window.location.href = '/login';
        })
        .catch(err => console.error('Error logging out:', err));
}

/* Attach Event Listeners */
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();

    document.getElementById('changeBtn').addEventListener('click', changeBackground);
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
});