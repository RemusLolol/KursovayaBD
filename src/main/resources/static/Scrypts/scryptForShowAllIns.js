document.addEventListener('DOMContentLoaded', function () {
    const email = new URLSearchParams(window.location.search).get('email');

    if (email) {
        addCircleAllIns(email);
    }
    getAllInsurances();
});

function getAllInsurances(){
    fetch('/allInsurances', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#documentTable tbody');
            if (Array.isArray(data)) {
                data.forEach(insurance => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                            <td>${insurance.clientemail}</td>
                            <td>${insurance.typeface}</td>
                            <td>${insurance.typeinsurance}</td>
                            <td>${insurance.suminsured}</td>
                            <td>${insurance.contract_start_date}</td>
                            <td>${insurance.contract_end_date}</td>
                            <td>${insurance.statuscheckedinsured}</td>
                        `;
                    tbody.appendChild(row);
                });
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => console.error('Error:', error));
}

function addCircleAllIns(email) {
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