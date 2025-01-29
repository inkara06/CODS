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
const containerColor = [
    "#FFFFFF",
    "#506682"
];
const inputColor = [
    "#FFFFFF",
    "#2C394A"
];
const containerShadow = [
    "0px 4px 8px rgba(69, 101, 145, 0.5)", 
    "0px 4px 8px rgba(31, 46, 65, 0.5)"
];
const navlinkColor = [
    "#2E4C72",
    "#FFFFFF"
];
const textColor = [
    "#476C9D",
    "#FFFFFF"
];
const borderColor = [
    "#476C9D",
    "#787878"
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
    document.getElementById("readMoreBtn").style.backgroundColor = btnColor2[currentColorIndex];
    document.getElementById("timeBtn").style.backgroundColor = btnColor2[currentColorIndex];
    document.getElementById("logoutButton").style.backgroundColor = btnColor2[currentColorIndex];

    const menuText = document.getElementsByClassName('nav-link'); 
    Array.from(menuText).forEach(navLink => navLink.style.color = navlinkColor[currentColorIndex]);

    const formText = document.getElementsByTagName('label'); 
    Array.from(formText).forEach(formLabel => formLabel.style.color = textColor[currentColorIndex]);

    const select_class = document.getElementsByClassName('select-class'); 
    Array.from(select_class).forEach(selClass => {
        selClass.style.color = textColor[currentColorIndex]
        selClass.style.backgroundColor = inputColor[currentColorIndex]
        selClass.style.borderColor = borderColor[currentColorIndex]
    });
        
    const inputText = document.getElementsByClassName('form-control'); 
    Array.from(inputText).forEach(formControl => {
        formControl.style.backgroundColor = inputColor[currentColorIndex]
        formControl.style.borderColor = borderColor[currentColorIndex]
        formControl.style.color = textColor[currentColorIndex]
    });

    document.getElementById("myContainer").style.backgroundColor = containerColor[currentColorIndex];

    document.getElementById("myContainer").style.boxShadow = containerShadow[currentColorIndex];

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


    if (document.querySelector('img').style.transform == 'rotate(0deg)') {
        document.querySelector('img').style.transform = 'rotate(180deg)';
    }
    else {
        document.querySelector('img').style.transform = 'rotate(0deg)';
    }

    document.getElementById('changeBtn').addEventListener('click', function() {
        let sound = document.getElementById('saveSound');
        sound.play();
    });

}

document.addEventListener('DOMContentLoaded', () => {
    /* Manipulating */
    const readMoreButton = document.getElementById('readMoreBtn');
    const extraContentInfo = document.getElementById('extraContent');

    function readMore(){
        if (extraContentInfo.style.display === 'none' || extraContentInfo.style.display === '') {
            extraContentInfo.style.display = 'block';
            readMoreButton.innerText = 'Hide'; 
        } else {
            extraContentInfo.style.display = 'none';
            readMoreButton.innerText = 'Read more'; 
        }
    }

    readMoreButton.addEventListener('click', readMore);

    const showTimeBtn = document.getElementById('timeBtn');

    /* Time */

    function showTime() {
        showTimeBtn.innerHTML = Date();
    }
    showTimeBtn.addEventListener('click', showTime);

    function displayGreeting() {
        const greetingElement = document.getElementById("greeting");
        const currentHour = new Date().getHours(); 
        let greeting;

        switch (true) {
            case (currentHour >= 5 && currentHour < 12):
                greeting = "Good morning!";
                break;
            case (currentHour >= 12 && currentHour < 18):
                greeting = "Good afternoon!";
                break;
            case (currentHour >= 18 && currentHour < 22):
                greeting = "Good evening!";
                break;
            default:
                greeting = "Good night!";
        }

        greetingElement.textContent = greeting;
    }

    displayGreeting();



});

/* Form */

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("saveButton").addEventListener("click", function(event) {

        const username = document.getElementById("exampleInputUsername").value;
        const email = document.getElementById("exampleInputEmail").value;
        const password = document.getElementById("exampleInputPassword").value;

        if (username === '' || email === '' || password === '') {
            alert("Please fill in all fields.");
            return;
        }

        if (!email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

       

    

    });
    document.getElementById('saveButton').addEventListener('click', function() {
        var sound = document.getElementById('saveSound');
        sound.play();
    });
    //Инкара
document.getElementById("logoutButton").addEventListener("click", function() {
    // Clear user data from local storage
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    // Redirect to the login page
    window.location.href = "index.html";
});
document.getElementById('saveButton').addEventListener('click', function (event) {
    event.preventDefault();

    // Получаем данные из формы
    const username = document.getElementById('exampleInputUsername').value;
    const email = document.getElementById('exampleInputEmail').value;

    // Сохраняем данные в localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    // Дополнительная логика (например, вывод уведомления о сохранении)
    alert('Changed succsesfully!');
});


});



