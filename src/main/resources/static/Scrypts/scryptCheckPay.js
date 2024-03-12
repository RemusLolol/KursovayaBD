document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    let emailText = params.get('email');

    if (emailText) {
        addCircleCheckPay(emailText);
    }
    getNumberDocuments2();
});

function addCircleCheckPay(email) {
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

function getNumberDocuments2(){
    fetch('/getInsurances', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            const documentSelect = document.getElementById('documentSelect2');

            documentSelect.innerHTML = '';

            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.id;
                documentSelect.appendChild(option);
            });

            getDocument2();
        })
        .catch(error => console.error('Error:', error));
}
function getDocument2(){
    const documentSelect = document.getElementById('documentSelect2').value;
    fetch('/getDocumentById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: documentSelect })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось получить данные');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('typePerson').textContent = data.typeface;
            document.getElementById('typeInsurance').textContent = data.typeinsurance;
            document.getElementById('insuranceSum').textContent = data.suminsured;
            document.getElementById('insuranceStart').textContent = formatDateAdd(data.contract_start_date);
            document.getElementById('insuranceEnd').textContent = formatDateAdd(data.contract_end_date);
            getDopInfoDoc()
        })
        .catch(error => {
            console.error(error);
        });
}

function getDopInfoDoc() {
    const documentSelect = document.getElementById('documentSelect2').value;
    fetch('/getInsurancePaymentsById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([documentSelect])
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось получить данные');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                document.getElementById('insuranceCase').textContent = data[0].insurance_case;
                document.getElementById('amountPayment').value  = data[0].amount_payment;

                document.getElementById('saveButton').disabled = false;
                document.getElementById('declineButton').disabled = false;

                calculateAmountPayment();
            }
            if(data.length === 0){
                document.getElementById('insuranceCase').textContent = "Отсутствует";
                document.getElementById('amountPayment').value  = 0;

                document.getElementById('saveButton').disabled = true;
                document.getElementById('declineButton').disabled = true;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function calculateAmountPayment() {
    const insuranceSum = parseFloat(document.getElementById('insuranceSum').textContent);
    let amountPayment;
    const severityInsuredevent = document.getElementById('severityInsuredevent').value;

    if (severityInsuredevent === 'Низкий') {
        amountPayment = insuranceSum * 0.2;
    } else if (severityInsuredevent === 'Средний') {
        amountPayment = insuranceSum * 0.4;
    } else if (severityInsuredevent === 'Высокий') {
        amountPayment = insuranceSum * 0.7;
    } else if (severityInsuredevent === 'Критический') {
        amountPayment = insuranceSum * 1.2;
    } else {
        amountPayment = 110;
    }

    document.getElementById('amountPayment').value = amountPayment;
}

function formatDateAdd(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}

function changeChecks(){
// сделать изменения в тяжести страхового случая и в сумме выплаты
// сделай изменение в статусе страховок
}

function declineCaseIns(){
// Сделать удаление в statusPayment и в statusCheck
}