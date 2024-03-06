let email;
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    email = params.get('email');

    if (email) {
        addCircle(email);
    }
    changeTypeFace();
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
    const clientemail = email
    console.log(clientemail);
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
        contract_end_date: contract_end_date,
        statuscheckedinsured: "Не проверено"
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
        })
        .catch(error => {
            console.error('Ошибка при отправке запроса:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте еще раз позже.');
        });
}


function changeTypeFace() {
    const selectTypeIns = document.getElementById('selectInsuranceType');
    const selectPerson = document.getElementById('selectPerson').value;

    selectTypeIns.innerHTML = " ";

    if (selectPerson === 'Физическое лицо') {
        addOptions(selectTypeIns, [
            'Медицинская страховка',
            'Автомобильная страховка',
            'Страхование жизни',
            'Страхование недвижимости',
            'Страхование путешествий'
        ]);
    } else if (selectPerson=== 'Юридическое лицо') {
        addOptions(selectTypeIns, [
            'Страхование имущества',
            'Ответственность юридического лица',
            'Страхование от несчастных случаев для сотрудников'
        ]);
    }
}

function addOptions(select, optionsArray) {
    optionsArray.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}