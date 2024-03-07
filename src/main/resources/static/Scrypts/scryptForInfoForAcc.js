window.onload = function() {
    const email = new URLSearchParams(window.location.search).get('email');
    const role = new URLSearchParams(window.location.search).get('role');

    if (email) {
        addCircleInfo(email);
    }
    if(role === 'client') {
        getInfoForAccountClient(email);
    }else{
        getInfoForAccountEmployee(email);
    }
};
function addCircleInfo(email) {
    const circle = document.getElementById('circle');
    circle.style.display = 'block';
    const emailElement = document.createElement('span');
    emailElement.textContent = email;
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

function getInfoForAccountClient(email) {
    fetch('/getInfoForAccountClient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data === null) {
                throw new Error('Client data is null');
            }
            displayClientInfoClient(data);
        })
        .catch(error => {
            console.error('There was an error with the request:', error);
        });
}

function displayClientInfoClient(clientData) {
    const container = document.querySelector('.container.mt-3');
    const fields = [
        { label: 'Имя: ', id: 'name', value: clientData.clientname },
        { label: 'Фамилия: ', id: 'lastName', value: clientData.clientsurname },
        { label: 'Дата рождения: ', id: 'dob', value: formatDate(clientData.dateofbirth) },
        { label: 'Пол: ', id: 'gender', value: clientData.sex },
        { label: 'Адрес: ', id: 'address', value: clientData.address },
        { label: 'Электронная почта: ', id: 'email', value: clientData.email },
        { label: 'Номер телефона: ', id: 'phone', value: clientData.phonenumber }
    ];

    fields.forEach(field => {
        const divField = document.createElement('div');
        divField.classList.add('field');

        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;

        const span = document.createElement('span');
        span.setAttribute('id', field.id);
        span.textContent = " " + field.value;

        divField.appendChild(label);
        divField.appendChild(span);

        container.appendChild(divField);
    });
}

function getInfoForAccountEmployee(email) {
    fetch('/getInfoForAccountEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data === null) {
                throw new Error('Client data is null');
            }
            displayEmployeeInfoClient(data);
        })
        .catch(error => {
            console.error('There was an error with the request:', error);
        });
}

function displayEmployeeInfoClient(employeeData) {
    const container = document.querySelector('.container.mt-3');
    const fields = [
        { label: 'Имя: ', id: 'employeename', value: employeeData.employeename },
        { label: 'Фамилия: ', id: 'employeesurname', value: employeeData.employeesurname },
        { label: 'Дата рождения: ', id: 'dateofbirth', value: formatDate(employeeData.dateofbirth) },
        { label: 'Пол: ', id: 'sex', value: employeeData.sex },
        { label: 'Номер телефона: ', id: 'phonenumber', value: employeeData.phonenumber },
        { label: 'Электронная почта: ', id: 'email', value: employeeData.email },
        { label: 'Дата найма: ', id: 'hiredate', value: formatDate(employeeData.hiredate) },
        { label: 'Должность: ', id: 'position', value: employeeData.position },
        { label: 'Отдел: ', id: 'department', value: employeeData.department }
    ];

    fields.forEach(field => {
        const divField = document.createElement('div');
        divField.classList.add('field');

        const label = document.createElement('label');
        label.setAttribute('for', field.id);

        label.textContent = field.label;

        const span = document.createElement('span');
        span.setAttribute('id', field.id);
        span.textContent = " " + field.value;

        divField.appendChild(label);
        divField.appendChild(span);

        container.appendChild(divField);
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}