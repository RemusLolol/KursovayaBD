function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function logout() {
    window.location.href = "/main";
    hideCircle();
}

function hideCircle(){
    const circle = document.getElementById('circle');
    circle.style.display = 'none';
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
    const navbarNav = document.querySelector('.navbar-nav');
    navbarNav.style.visibility = 'visible';
    document.getElementById('butCreateIns').style.visibility = 'hidden';
    document.getElementById('butCreateReport').style.visibility = 'hidden';

}

function redirectToMainPage(){
    const params = new URLSearchParams(window.location.search);
    email = params.get('email');
    window.location.href = "/main?email=" + encodeURIComponent(email);
}
function redirectToInsurancePolicyRegistration() {
    let email;
    if (document.getElementById('inputEmailEmail')) {
        email = document.getElementById('inputEmailEmail').value;
        console.log(1);
    }
    if (!email) {
        email = new URLSearchParams(window.location.search).get('email');
        console.log(email);
    }
    window.location.href = "/newInsurance?email=" + encodeURIComponent(email);
}
function viewAccountInfo() {
    let email;
    if (document.getElementById('inputEmailEmail')) {
        email = document.getElementById('inputEmailEmail').value;
        console.log(1);
    }
    if (!email) {
        email = new URLSearchParams(window.location.search).get('email');
        console.log(email);
    }
    window.location.href = "/infoForAccount?email=" + encodeURIComponent(email);

}

function viewInsurancePolicies() {
    let email;
    if (document.getElementById('inputEmailEmail')) {
        email = document.getElementById('inputEmailEmail').value;
        console.log(1);
    }
    if (!email) {
        email = new URLSearchParams(window.location.search).get('email');
        console.log(email);
    }
    window.location.href = "/infoForInsurances?email=" + encodeURIComponent(email);
}


function redirectToReportGeneration() {
    window.location.href = "link_to_report_generation_page.html";
}