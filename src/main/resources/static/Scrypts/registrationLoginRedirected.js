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
let emailText
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
                addCircle();
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

function viewAccountInfo() {
    alert("Просмотр информации об аккаунте");
}

function viewInsurancePolicies() {
    alert("Просмотр зарегистрированных страховых полисов");
}

function logout() {
    window.location.href = "/main";
    hideCircle();
}

function addCircle(){
    $('#loginModal').modal('hide');
    const navbarNav = document.querySelector('.navbar-nav');
    navbarNav.style.visibility = 'hidden';
    const circle = document.getElementById('circle');
    circle.style.display = 'block';

    const emailElement = document.createElement('span'); // Создаем DOM-элемент span
    emailElement.textContent = emailText; // Устанавливаем текст содержимого
    emailElement.style.display = 'none'; // Устанавливаем свойство display

    circle.appendChild(emailElement); // Добавляем элемент как потомка элемента

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
    window.location.href = "/main";
}
function redirectToInsurancePolicyRegistration() {
    const email = document.getElementById('inputEmailEmail').value; // Получаем email пользователя
    window.location.href = "/newInsurance?email=" + encodeURIComponent(email); // Перенаправляем пользователя на новую страницу с передачей email в качестве параметра
}


function redirectToReportGeneration() {
    window.location.href = "link_to_report_generation_page.html";
}