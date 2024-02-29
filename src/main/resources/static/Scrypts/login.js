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
                alert("Login successful");
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        });
}
