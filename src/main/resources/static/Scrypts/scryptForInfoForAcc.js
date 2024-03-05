let email;
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    email = params.get('email');

    if (email) {
        addCircleInfo(email);
    }
    getInfoForAccount(email);
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

function getInfoForAccount(email) {
    fetch('/getInfoForAccount', {
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
            displayClientInfo(data);
        })
        .catch(error => {
            console.error('There was an error with the request:', error);
        });
}

function displayClientInfo(clientData) {
    document.getElementById('name').textContent = clientData.clientname;
    document.getElementById('lastName').textContent = clientData.clientsurname;
    document.getElementById('dob').textContent = clientData.dateofbirth;
    document.getElementById('gender').textContent = clientData.sex;
    document.getElementById('address').textContent = clientData.address;
    document.getElementById('email').textContent = clientData.email;
    document.getElementById('phone').textContent = clientData.phonenumber;
}