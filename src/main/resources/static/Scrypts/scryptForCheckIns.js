window.onload = function() {
    const email = new URLSearchParams(window.location.search).get('email');
    const role = new URLSearchParams(window.location.search).get('role');

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
                            <td>${checkedInsurances.id_document_insurances}</td>
                            <td>${checkedInsurances.a}</td>
                            <td>${checkedInsurances.insurance_claim_check}</td>
                            <td>${checkedInsurances.payment_verification_check}</td>
                        `;
                    tbody.appendChild(row);
                });
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => console.error('Error:', error));
}