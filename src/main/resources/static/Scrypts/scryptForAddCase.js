document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    let emailText = params.get('email');

    if (emailText) {
        addCircleShowAddCase(emailText);
    }
    getNumberDocuments(emailText);
});

function addCircleShowAddCase(email) {
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

function getNumberDocuments(email){
    fetch('/getInsurancesByEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => response.json())
        .then(data => {
            const documentSelect = document.getElementById('documentSelect');

            documentSelect.innerHTML = '';

            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.typeinsurance;
                documentSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}
function getDocument(){
    const documentSelect = document.getElementById('documentSelect').value;
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
        })
        .catch(error => {
            console.error(error);
        });
}

function addInsurancesCase() {
    event.preventDefault();

    const documentSelect = document.getElementById("documentSelect");
    const selectedDocumentId = documentSelect.value;
    const insuranceCaseInput = document.getElementById("insuranceCaseInput");
    const insuranceCase = insuranceCaseInput.value;

    const formData = {
        id_document_insurances : selectedDocumentId,
        insurance_case : insuranceCase,
        severityinsuredevent : "Низкий",
        amount_payment : 1
    };

    fetch("/addNewInsurancePayment", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                addCheckStatusInsurance();
                return response.text();
            } else {
                throw new Error("Ошибка добавления записи");
            }
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error(error);
            alert("Произошла ошибка при добавлении записи");
        });
}

function addCheckStatusInsurance() {
    let updatedInsurances = [];

    updatedInsurances.push({
        id_document_insurances: 1,
        statusCheckedInsured: 'Не подтверждено',
        insurance_claim_check: 'Не подтверждено',
        payment_verification_check: 'Не выплачено'
    });

    fetch('/saveCheckInsurance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedInsurances)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Changes saved:', data);
            console.log('Response data:', JSON.stringify(data));
        })
        .catch(error => console.error('Error:', error));
}
// Сделай триггер для проверки по id, если существует, то statusCheckedInsured не менять

function formatDateAdd(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}