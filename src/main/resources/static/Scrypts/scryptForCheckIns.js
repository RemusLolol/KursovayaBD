window.onload = function() {
    const email = new URLSearchParams(window.location.search).get('email');

    if (email) {
        addCircleCheck(email);
    }
    getAllCheckedInsurances();
};
function addCircleCheck(email) {
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

function getAllCheckedInsurances(){
    fetch('/allCheckedInsurances', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#documentTable tbody');
            if (Array.isArray(data)) {
                data.forEach(checkedInsurances => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><a id="docum" href="#" data-toggle="modal" data-target="#myModal" data-document-id="${checkedInsurances.id_document_insurances}" onclick="showModal(this);" ">${checkedInsurances.id_document_insurances}</a></td>
                        <td>
                            <select style="background-color: #343a40; color: #ffffff" class="form-control">
                                <option value="checked" ${checkedInsurances.statusCheckedInsured === 'Проверено' ? 'selected' : ''}>Проверено</option>
                                <option value="not_checked" ${checkedInsurances.statusCheckedInsured === 'Не проверено' ? 'selected' : ''}>Не проверено</option>
                            </select>
                        </td>                            
                        <td>
                            <select style="background-color: #343a40; color: #ffffff" class="form-control">
                                <option value="confirmed" ${checkedInsurances.insurance_claim_check === 'Подтверждено' ? 'selected' : ''}>Подтверждено</option>
                                <option value="not_confirmed" ${checkedInsurances.insurance_claim_check === 'Не подтверждено' ? 'selected' : ''}>Не подтверждено</option>
                            </select>
                        </td>
                        <td>
                            <select style="background-color: #343a40; color: #ffffff" class="form-control">
                                <option value="paid" ${checkedInsurances.payment_verification_check === 'Выплачено' ? 'selected' : ''}>Выплачено</option>
                                <option value="not_paid" ${checkedInsurances.payment_verification_check === 'Не выплачено' ? 'selected' : ''}>Не выплачено</option>
                            </select>
                        </td>`;

                    tbody.appendChild(row);
                });
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => console.error('Error:', error));
}

function showModal(element) {
    const id = element.dataset.documentId;
    fetch('/getDocumentByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось получить данные');
            }
            return response.json();
        })
        .then(data => {
            const modalBody = document.querySelector('#myModal .modal-body');
            const table = document.createElement('table');
            table.classList.add('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const headers = ['#', 'Email клиента', 'Вид документа', 'Тип страховки', 'Страховая сумма', 'Дата начала действия', 'Дата окончания действия'];
            const trHeaders = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                trHeaders.appendChild(th);
            });
            thead.appendChild(trHeaders);

            const tr = document.createElement('tr');
            const idTd = document.createElement('td');
            idTd.textContent = data.id;
            tr.appendChild(idTd);
            const emailTd = document.createElement('td');
            emailTd.textContent = data.clientemail;
            tr.appendChild(emailTd);
            const typeDocumentTd = document.createElement('td');
            typeDocumentTd.textContent = data.typeface;
            tr.appendChild(typeDocumentTd);
            const typeInsuranceTd = document.createElement('td');
            typeInsuranceTd.textContent = data.typeinsurance;
            tr.appendChild(typeInsuranceTd);
            const amountTd = document.createElement('td');
            amountTd.textContent = data.suminsured;
            tr.appendChild(amountTd);
            const startDateTd = document.createElement('td');
            startDateTd.textContent = formatDate(data.contract_start_date);
            tr.appendChild(startDateTd);
            const endDateTd = document.createElement('td');
            endDateTd.textContent = formatDate(data.contract_end_date);
            tr.appendChild(endDateTd);

            tbody.appendChild(tr);

            table.appendChild(thead);
            table.appendChild(tbody);

            modalBody.innerHTML = '';
            modalBody.appendChild(table);

            $('#myModal').modal('show');
        })
        .catch(error => {
            console.error(error);
        });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}

function saveChanges() {
    const tbody = document.querySelector('#documentTable tbody');
    const updatedInsurances = [];

    for (let i = 0; i < tbody.rows.length; i++) {
        const row = tbody.rows[i];
        const id = row.cells[0].textContent;
        const statusCheckedInsured = row.cells[1].querySelector('select').value;
        const insuranceClaimCheck = row.cells[2].querySelector('select').value;
        const paymentVerificationCheck = row.cells[3].querySelector('select').value;

        updatedInsurances.push({
            id_document_insurances: id,
            statusCheckedInsured: statusCheckedInsured === 'checked' ? 'Проверено' : 'Не проверено',
            insurance_claim_check: insuranceClaimCheck === 'confirmed' ? 'Подтверждено' : 'Не подтверждено',
            payment_verification_check: paymentVerificationCheck === 'paid' ? 'Выплачено' : 'Не выплачено'
        });
    }

    console.log('Updated insurances:', updatedInsurances);

    fetch('/saveChanges', {
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