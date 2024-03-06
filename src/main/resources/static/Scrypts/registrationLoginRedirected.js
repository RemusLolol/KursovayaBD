window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    if (email && sessionStorage.getItem('visited') === 'true') {
        addCircleMain(email);
        document.getElementById('butCreateIns').style.visibility = 'visible';
        document.getElementById('butCreateReport').style.visibility = 'visible';
    }
    sessionStorage.setItem('visited', 'true');
};

function regClient() {
    event.preventDefault();

    const nameClient = document.getElementById('inputName').value;
    const lastNameClient = document.getElementById('inputLastName').value;
    const dataBirthday = document.getElementById('inputDOB').value;
    const gender = document.getElementById('inputGender').value;
    const address = document.getElementById('inputAddress').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;
    const password = document.getElementById('inputPassword').value;

    const clientData = {
        clientname: nameClient,
        clientsurname: lastNameClient,
        dateofbirth : dataBirthday,
        sex : gender,
        address : address,
        phonenumber : phone,
        email : email,
        password_hash : password
    };

    fetch('/registerClient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
    })
        .then(response => {
            if (response.ok) {
                alert("Registration successful");
            } else if (response.status === 400) {
                response.text().then(errorMessage => {
                    alert(errorMessage);
                });
            } else {
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        });
}

function regEmployee() {
    event.preventDefault();

    const nameEmpl = document.getElementById('inputNameEmpl').value;
    const lastNameEmpl = document.getElementById('inputLastNameEmpl').value;
    const dataBirthday = document.getElementById('inputDOBEmpl').value;
    const gender = document.getElementById('inputGenderEmpl').value;
    const email = document.getElementById('inputEmailEmpl').value;
    const phone = document.getElementById('inputPhoneEmpl').value;
    const hireDateEmpl = document.getElementById('inputHireDateEmpl').value;
    const positionEmpl = document.getElementById('inputPositionEmpl').value;
    const departmentEmpl = document.getElementById('inputDepartmentEmpl').value;
    const passwordEmpl = document.getElementById('inputPasswordEmpl').value;

    const employeeData = {
        employeename: nameEmpl,
        employeesurname: lastNameEmpl,
        dateofbirth: dataBirthday,
        sex: gender,
        phonenumber: phone,
        email: email,
        hiredate: hireDateEmpl,
        position: positionEmpl,
        department: departmentEmpl,
        password_hash: passwordEmpl
    };

    fetch('/registerEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
        .then(response => {
            if (response.ok) {
                alert("Registration successful");
            } else if (response.status === 400) {
                return response.text();
            } else {
                throw new Error('Registration failed');
            }
        })
        .then(message => {
            alert(message);
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        });

}
let emailText;
function autentification() {
    event.preventDefault();

    const email = document.getElementById('inputEmailEmail').value;
    const password = document.getElementById('passwordLogin').value;
    const userType = document.getElementById('userType').value;

    const userData = {
        email: email,
        password_hash: password
    };
    emailText = email;
    let url = '';
    if (userType === 'employee') {
        url = '/loginEmployee';
    } else if (userType === 'customer') {
        url = '/loginClient';
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                if (userType === 'employee') {
                    const emailText = document.createElement('span');
                } else if (userType === 'customer') {
                    document.getElementById('butCreateIns').style.visibility = 'visible';
                    document.getElementById('butCreateReport').style.visibility = 'visible';
                }
                alert('Login succesfull');
                addCircleMain();
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        });
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function addCircleMain(){
    $('#loginModal').modal('hide');
    const navbarNav = document.querySelector('.navbar-nav');
    navbarNav.style.visibility = 'hidden';
    const circle = document.getElementById('circle');
    circle.style.display = 'block';

    const emailElement = document.createElement('span');
    emailElement.textContent = emailText;
    emailElement.style.display = 'none';

    circle.appendChild(emailElement);

    circle.addEventListener('mouseenter', function() {
        emailElement.style.display = 'block';
        emailElement.style.position = 'absolute';
        emailElement.style.top = '-20px';
        emailElement.style.left = '50%';
        emailElement.style.transform = 'translateX(-50%)';
    });
    circle.addEventListener('mouseleave', function() {
        emailElement.style.display = 'none';
    });
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
    let params = new URLSearchParams(window.location.search).get('email');
    window.location.href = "/main?email=" + encodeURIComponent(params);
}
function redirectToInsurancePolicyRegistration() {
    const email = document.getElementById('inputEmailEmail').value;
    window.location.href = "/newInsurance?email=" + encodeURIComponent(email);
}
function viewAccountInfo() {
    let params = new URLSearchParams(window.location.search).get('email');
    if(params === null){
        params = document.getElementById('inputEmailEmail').value;
    }
    window.location.href = "/infoForAccount?email=" + encodeURIComponent(params);
}
function viewInsurancePolicies() {
    let params = new URLSearchParams(window.location.search).get('email');
    if(params === null){
        params = document.getElementById('inputEmailEmail').value;
    }
    window.location.href = "/infoForInsurances?email=" + encodeURIComponent(params);
}
function logout() {
    window.location.href = "/main";
    hideCircle();
}