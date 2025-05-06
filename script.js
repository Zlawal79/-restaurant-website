// Function to toggle the visibility of menu items when clicking on a category
function toggleMenu(category) {
    var menu = document.getElementById(category);
    if (menu.style.display === 'block') {
        menu.style.display = 'none'; // Hide the menu items if already visible
    } else {
        menu.style.display = 'block'; // Show the menu items if they are hidden
    }
}

// Function to open the order page in a new window/tab
function openOrderPage() {
    window.open('order.html', '_blank'); // Opens 'order.html' in a new tab
}

