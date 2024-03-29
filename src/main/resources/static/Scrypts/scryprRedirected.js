function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function logout() {
    window.location.href = "/main";
    hideCircle();
}

function redirectToMainPage(){
    const email = new URLSearchParams(window.location.search).get('email');
    const role = new URLSearchParams(window.location.search).get('role');
    window.location.href = "/main?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
}

function hideCircle() {
    const circle = document.getElementById('circle');
    circle.style.display = 'none';
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
    const navbarNav = document.querySelector('.navbar-nav');
    navbarNav.style.visibility = 'visible';
    document.getElementById('butCreateIns').style.visibility = 'hidden';
    document.getElementById('butCreateReport').style.visibility = 'hidden';
}

function redirectToInsurancePolicyRegistration() {
    let email= new URLSearchParams(window.location.search).get('email');
    const role = new URLSearchParams(window.location.search).get('role');
    if(role === 'client') {
        window.location.href = "/newInsurance?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
    }else {
        window.location.href = "/checkStatus?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
    }
}
function viewAccountInfo() {
    let email= new URLSearchParams(window.location.search).get('email');
    const role = new URLSearchParams(window.location.search).get('role');
    window.location.href = "/infoForAccount?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);

}

function viewInsurancePolicies() {
    let email= new URLSearchParams(window.location.search).get('email');
    const role = new URLSearchParams(window.location.search).get('role');
    if(role === 'client') {
        window.location.href = "/infoForInsurances?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
    }else {
        window.location.href = "/showAllInsurances?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
    }
}

function addCaseIns() {
    let email= new URLSearchParams(window.location.search).get('email');
    const role = new URLSearchParams(window.location.search).get('role');
    if(role === 'client') {
        window.location.href = "/addCase?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
    }else {
        window.location.href = "/checkPayments?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
    }
}