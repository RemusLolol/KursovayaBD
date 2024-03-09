let email;
window.onload = function() {
    email = new URLSearchParams(window.location.search).get('email');

    if (email) {
        addCircle(email);
    }
};

function addCircle(email) {
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

function regNewInsurances() {
    event.preventDefault();
    const clientemail = email
    const typeface = document.getElementById('selectPerson').value;
    const typeinsurance = document.getElementById('selectInsuranceType').value;
    const suminsured = document.getElementById('insuranceAmount').value;
    const contract_end_date = document.getElementById('inputDateEnd').value;
    const today = new Date().toISOString().split('T')[0];

    const newInsurance = {
        clientemail: clientemail,
        typeface: typeface,
        typeinsurance: typeinsurance,
        suminsured: suminsured,
        contract_start_date : today,
        contract_end_date: contract_end_date
    };

    fetch('/addNewInsurances', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInsurance)
    })
        .then(response => {
            if (response.ok) {
                alert('Страховка успешно зарегистрирована.');
            } else {
                alert('Ошибка при регистрации страховки. Пожалуйста, попробуйте еще раз.');
            }
            addCircle(email);
        })
        .catch(error => {
            console.error('Ошибка при отправке запроса:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте еще раз позже.');
        });
}

function changeTypeFace() {
    const selectTypeIns = document.getElementById('selectInsuranceType');
    const selectPerson = document.getElementById('selectPerson').value;

    selectTypeIns.innerHTML = "";

    fetch('/getTypeInsurances', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ typeface: selectPerson })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            addOptions(selectTypeIns, data);
        })
        .catch(error => console.error(error));
}

function addOptions(select, optionsArray) {
    optionsArray.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.textContent = option.typeinsurances;
        select.appendChild(optionElement);
    });
}
