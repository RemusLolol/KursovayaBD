function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function viewAccountInfo() {
    alert("Просмотр информации об аккаунте");
}

function viewInsurancePolicies() {
    alert("Просмотр зарегистрированных страховых полисов");
}

function logout() {
    alert("Выход из аккаунта");
}
