const backColors = [
  "linear-gradient(to bottom right, #476C9D, #7497CF, #2E4C72)",
  "linear-gradient(to bottom right, #18283D, #2F4E75, #18283D)"
];
const footColor = [
  "#476C9D",
  "#18283D"
];
const btnColor = [
  "#476C9D",
  "#18283D"
];
const btnColor2 = [
  "#476C9D",
  "#284163"
];
const setColor = [
  "#7497CF",
  "#35547E"
];
const containerColor = [
  "#FFFFFF",
  "#506682"
];
const containerShadow = [
  "0px 4px 8px rgba(69, 101, 145, 0.5)", 
  "0px 4px 8px rgba(31, 46, 65, 0.5)"
];
const navlinkColor = [
  "#2E4C72",
  "#FFFFFF"
];
const contsctUsColor = [
  "#476C9D",
  "#FFFFFF"
];
const userColor = [
  "#476C9D",
  "#FFFFFF"
];

let currentColorIndex = 0;

/* Change Background */

function changeBackground() {
  currentColorIndex++;

  if (currentColorIndex >= backColors.length) {
      currentColorIndex = 0;
  }

  document.body.style.background = backColors[currentColorIndex];
  
  document.getElementById("myFooter").style.background = footColor[currentColorIndex];

  const buttons = document.getElementsByClassName('btn'); 
  Array.from(buttons).forEach(btn => btn.style.backgroundColor = btnColor[currentColorIndex]);
  document.getElementById("changeBtn").style.backgroundColor = btnColor2[currentColorIndex];
  document.getElementById("logoutButton").style.backgroundColor = btnColor2[currentColorIndex];

  const product_item = document.getElementsByClassName('product-item'); 
  Array.from(product_item).forEach(product => {
    product.style.backgroundColor = containerColor[currentColorIndex]
    product.style.boxShadow = containerShadow[currentColorIndex]
  });

  const productName = document.getElementsByClassName('product_name'); 
  Array.from(productName).forEach(prodName => prodName.style.color = navlinkColor[currentColorIndex]);

  const menuText = document.getElementsByClassName('nav-link'); 
  Array.from(menuText).forEach(navLink => navLink.style.color = navlinkColor[currentColorIndex]);

  const navbar = document.getElementById('myNavbar');
  if (navbar.classList.contains('navbar-light')) {
      navbar.classList.remove('navbar-light', 'bg-light');
      navbar.classList.add('navbar-dark', 'bg-dark');
      document.body.classList.remove('bg-light');
      document.body.classList.add('bg-dark');
  } else {
      navbar.classList.remove('navbar-dark', 'bg-dark');
      navbar.classList.add('navbar-light', 'bg-light');
      document.body.classList.remove('bg-dark');
      document.body.classList.add('bg-light');
  }

}

function toggleAnswer(id) {
  var answer = document.getElementById(id);
  if (answer.style.display === "block") {
    answer.style.display = "none";
  } else {
    answer.style.display = "block";
  }
}
function displayDateTime() {
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dateTime').innerHTML = date.toLocaleDateString('ru', options);
}

function displayCurrentTime() {
  const time = new Date().toLocaleTimeString('ru');
  document.getElementById('dateTime').innerHTML = time;
}

// Update date and time every second
setInterval(displayDateTime, 1000);

// Add click event listener to the button
document.getElementById('timeButton').addEventListener('click', displayCurrentTime);



// Function to handle keydown events for menu navigation
function handleKeyDown(event) {
  const navItems = document.querySelectorAll('#navMenu .nav-link');
  const currentIndex = Array.from(navItems).findIndex(item => document.activeElement === item);

  if (event.key === 'ArrowDown') {
      // Move focus down
      event.preventDefault(); // Prevent scrolling
      const nextIndex = (currentIndex + 1) % navItems.length; // Loop back to start
      navItems[nextIndex].focus();
  } else if (event.key === 'ArrowUp') {
      // Move focus up
      event.preventDefault(); // Prevent scrolling
      const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length; // Loop to end
      navItems[prevIndex].focus();
  }
}

// Добавляем обработчик события нажатия клавиш на весь документ
document.addEventListener('keydown', handleKeyDown);

window.addEventListener('DOMContentLoaded', () => {
    const firstNavItem = document.querySelector('#navMenu .nav-link');
    if (firstNavItem) {
        firstNavItem.focus();
    }
});

// Function to display greeting based on the time of day
function displayGreeting() {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
      greeting = "Good morning!";
  } else if (hour < 18) {
      greeting = "Good afternoon!";
  } else {
      greeting = "Good evening!";
  }

  document.getElementById('greeting').innerHTML = greeting;
}
document.getElementById("logoutButton").addEventListener("click", function() {
  // Если нужно очистить данные после логаута
  // localStorage.removeItem("username");
  // localStorage.removeItem("email");

  // Перенаправление на страницу логина
  window.location.href = "/";
});

// // Call displayGreeting when the page loads
// window.addEventListener('DOMContentLoaded', displayGreeting);

// // Функция для сохранения фильтров в localStorage
// function saveFilters() {
//   const selectedCategory = document.getElementById("category").value;
//   localStorage.setItem("selectedCategory", selectedCategory);
// }

// // Функция для загрузки и применения сохраненных фильтров
// function applySavedFilters() {
//   const savedCategory = localStorage.getItem("selectedCategory");

//   if (savedCategory) {
//       document.getElementById("category").value = savedCategory;
//       applyFilters();
//   }
// }


// // Функция для применения фильтров к элементам каталога
// function applyFilters() {
//   const selectedCategory = document.getElementById("category").value;
//   const products = document.querySelectorAll(".product-item");

//   products.forEach((product) => {
//       const productCategory = product.getAttribute("data-category");

//       // Показать/скрыть товар в зависимости от выбранной категории
//       if (selectedCategory === "" || productCategory === selectedCategory) {
//           product.style.display = "block";
//       } else {
//           product.style.display = "none";
//       }
//   });
// }

// // Событие для сохранения фильтров при изменении выбора
// document.getElementById("category").addEventListener("change", () => {
//   saveFilters();
//   applyFilters();
// });

// // Вызов функции для применения сохранённых фильтров при загрузке страницы
// window.addEventListener("load", applySavedFilters);
