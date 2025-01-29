
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

  document.getElementById("colorFilter").style.backgroundColor = containerColor[currentColorIndex];
  document.getElementById("sizeFilter").style.backgroundColor = containerColor[currentColorIndex];
  document.getElementById("priceRange").style.backgroundColor = containerColor[currentColorIndex];
  const select = document.getElementsByClassName('mySelect'); 
  Array.from(select).forEach(sel => sel.style.color = navlinkColor[currentColorIndex]);

  document.getElementById("myCatalog").style.color = navlinkColor[currentColorIndex];

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
function validateForm() {
  let email = document.forms["myForm"]["email"].value;
 
  
  if (email == "" || !email.includes("@")) { 
    alert("Please enter a valid email.");
    return false;
  }
  return true;
}

function showForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}


// Rating system
document.getElementsByClassName('rating').forEach((rating) => {
  const stars = rating.getElementsByClassName('star');
  stars.forEach((star) => {
      star.addEventListener('click', () => {
          const productID = star.getAttribute('data-product');
          const starIndex = parseInt(star.getAttribute('data-index'));

          stars.forEach((s, i) => {
              s.style.color = i <= starIndex ? 'gold' : 'black';
          });
          
          console.log(`Product ${productID} rated ${starIndex + 1} stars`);
      });
  });
});

// Toggle additional content
document.getElementById('toggleButton').addEventListener('click', function() {
  const content = document.getElementById('additionalContent');
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
});

let currentStep = 0;

// Function to show the multi-step form
function showForm() {
    document.getElementById('popupForm').style.display = 'block';
    showStep(currentStep);
}

// Function to close the multi-step form
function closeForm() {
    document.getElementById('popupForm').style.display = 'none';
}


// Function to display confirmation details
function displayConfirmation() {
    const confirmationDiv = document.getElementById('confirmation');
    const formData = new FormData(document.getElementById('formSteps'));
    confirmationDiv.innerHTML = '';
    formData.forEach((value, key) => {
        confirmationDiv.innerHTML += `<p><strong>${key}</strong>: ${value}</p>`;
    });
}
function playSound() {
  var sound = document.getElementById('notificationSound');
  sound.play();
}

function showForm() {
  document.getElementById('popupForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('popupForm').style.display = 'none';
}

