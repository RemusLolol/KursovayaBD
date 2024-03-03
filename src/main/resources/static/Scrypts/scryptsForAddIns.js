window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

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

    circle.appendChild(emailElement); // Добавляем элемент как потомка элемента

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

function regNewInsurances(){
    const selectTypeFace = document.getElementById('selectPerson').value;
    const selectTypeIns = document.getElementById('selectInsuranceType').value;
    const inputAmount = document.getElementById('insuranceAmount').value;
    const inputDateEnd = document.getElementById('inputDateEnd').value;


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