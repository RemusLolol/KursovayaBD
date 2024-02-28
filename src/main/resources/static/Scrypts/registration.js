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
            clientName: nameClient,
            clientSurname: lastNameClient,
            dateOfBirth : dataBirthday,
            sex : gender,
            address : address,
            phoneNumber : phone,
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
                } else {
                    alert('Registration failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again later.');
            });
}
document.getElementById('registrationForm').addEventListener('submit', regClient);


function regEmployee(){
    const nameEmpl = document.getElementById('inputNameEmpl');
    const lastNameEmpl = document.getElementById('inputLastNameEmpl');
    const dataBirthday = document.getElementById('inputDOBEmpl');
    const gender = document.getElementById('inputGenderEmpl');
    const email = document.getElementById('inputEmailEmpl');
    const phone = document.getElementById('inputPhoneEmpl');
    const hireDateEmpl = document.getElementById('inputHireDateEmpl');
    const positionEmpl = document.getElementById('inputPositionEmpl');
    const departmentEmpl = document.getElementById('inputDepartmentEmpl');
    const passwordEmpl = document.getElementById('inputPasswordEmpl');
}