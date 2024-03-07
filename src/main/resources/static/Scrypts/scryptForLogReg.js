window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    if (email && sessionStorage.getItem('visited') === 'true') {
        addCircle(email);
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
    } else if (userType === 'client') {
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
                let role;
                if (userType === 'employee') {
                    role = 'employee;'
                } else if (userType === 'client') {
                    role = 'client';
                }
                window.location.href = "/main?email=" + encodeURIComponent(email) + "&role=" + encodeURIComponent(role);
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        });
}

function addCircle(emailText){
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

    changeMenuCircle();
}

function changeMenuCircle(){
    const role = new URLSearchParams(window.location.search).get('role');

    if(role === 'client') {
        document.getElementById('butCreateIns').style.visibility = 'visible';
        document.getElementById('butCreateReport').style.visibility = 'visible';

        const secondButtonMenu = document.getElementById('secondButtonMenu');
        secondButtonMenu.innerText = ' Просмотреть зарегистрированные страховые полисы';
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-file-alt');
        secondButtonMenu.prepend(icon);
    }
    else{
        const secondButtonMenu = document.getElementById('secondButtonMenu');
        secondButtonMenu.innerText = ' Просмотреть все страховые полисы';
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-file-alt');
        secondButtonMenu.prepend(icon);
    }
}