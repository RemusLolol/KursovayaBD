function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function viewAccountInfo() {
    alert("Просмотр информации об аккаунте");
}

function viewInsurancePolicies() {
    alert("Просмотр зарегистрированных страховых полисов");
}

function logout() {
    const circle = document.getElementById('circle');
    circle.style.display = 'none';
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
    const navbarNav = document.querySelector('.navbar-nav');
    navbarNav.style.visibility = 'visible';
    document.getElementById('butCreateIns').style.visibility = 'hidden';
    document.getElementById('butCreateReport').style.visibility = 'hidden';
}
