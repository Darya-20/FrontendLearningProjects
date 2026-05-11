// Задание 6.10.1
const userInput = prompt('Введите любое число:');

const number = +userInput;

if (isNaN(number)) {
    alert('Введите корректное число.');
} else {
    const square = number ** 2;
    const cube = number ** 3;

    const message = `${number}\n${square}\n${cube}`;

    alert(message);
}


// Задание 6.10.2

const promoCode = prompt('Введите промокод для получения скидки:');
const validPromo = 'скидка';

if (promoCode === null || promoCode.trim() === '') {
    alert('Введите промокод.');
} else {
    const normalizedPromo = promoCode.trim().toLowerCase();

    if (normalizedPromo === validPromo) {
        alert('Промокод применён');
    } else {
        alert('Промокод не работает');
    }
}


// Задание 6.10.3

const name = prompt('Введите ваше имя:');
const birthYear = prompt('Введите год вашего рождения:');
const currentYear = new Date().getFullYear();
const age = currentYear - Number(birthYear);

if (!name || name.trim() === '') {
    alert('Введите имя.');
} else if (isNaN(age)) {
    alert('Год должен быть числом!');
} else if (age < 0) {
    alert('Некорректный год рождения.');
} else {
    alert(`${name}: ${age}`);
}


// Задание 6.10.4

const name = prompt('Введите ваше имя:');
const birthYear = prompt('Введите год вашего рождения:');
const currentYear = new Date().getFullYear();
const age = currentYear - Number(birthYear);

if (!name || name.trim() === '') {
    alert('Введите имя.');
} else if (isNaN(age)) {
    alert('Год должен быть числом!');
} else if (age < 0) {
    alert('Некорректный год рождения.');
} else {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    let ageWord;

    switch (true) {
    case (lastDigit === 1 && lastTwoDigits !== 11):
        ageWord = "год";
        break;
    case ((lastDigit >= 2 && lastDigit <= 4) && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)):
        ageWord = "года";
        break;
    default:
        ageWord = "лет";
    }

    alert(`${name}: ${age} ${ageWord}`);
}



