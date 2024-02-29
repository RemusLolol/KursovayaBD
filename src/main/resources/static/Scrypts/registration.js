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
document.getElementById('registrationClientForm').addEventListener('submit', regClient);

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

document.getElementById('registrationEmployeeForm').addEventListener('submit', regClient);