document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    let emailText = params.get('email');

    if (emailText) {
        addCircleShowAllIns(emailText);
    }
    getInsurances(emailText);
});

function getInsurances(email){
    fetch('/insurancesByEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
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
                            <td>${formatDateShowReg(insurance.contract_start_date)}</td>
                            <td>${formatDateShowReg(insurance.contract_end_date)}</td>
                        `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Data is not an array:', data);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addCircleShowAllIns(email) {
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

function formatDateShowReg(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}