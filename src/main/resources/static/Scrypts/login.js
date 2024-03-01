function autentification() {
    event.preventDefault();

    const email = document.getElementById('inputEmailEmail').value;
    const password = document.getElementById('passwordLogin').value;
    const userType = document.getElementById('userType').value;

    const userData = {
        email: email,
        password_hash: password
    };

    let url = '';
    if (userType === 'employee') {
        url = '/loginEmployee';
    } else if (userType === 'customer') {
        url = '/loginClient';
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                $('#loginModal').modal('hide');
                var navbarNav = document.querySelector('.navbar-nav');
                navbarNav.style.display = 'none';
                var circle = document.getElementById('circle');
                circle.style.display = 'block';

                var emailText = document.createElement('span');
                emailText.textContent = email;
                emailText.style.display = 'none';

                circle.appendChild(emailText);

                circle.addEventListener('mouseenter', function() {
                    // Показываем текстовый элемент
                    emailText.style.display = 'block';
                    emailText.style.position = 'absolute';
                    emailText.style.top = '-20px';
                    emailText.style.left = '50%';
                    emailText.style.transform = 'translateX(-50%)';
                });
                circle.addEventListener('mouseleave', function() {
                    emailText.style.display = 'none';
                });

                alert('Login succesfull');
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        });
}
