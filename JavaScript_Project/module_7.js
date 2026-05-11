// Задание 7.6.1

const reversedWord = word.split('').reverse().join('');
if (word.toLowerCase() === reversedWord.toLowerCase()) {
    console.log(`Слово ${word} является палиндромом`);
} else {
    console.log(`Слово ${word} не является палиндромом`);
}


// Задание 7.6.2

const arr = [1, 2, 3, 1, 5, 4, 2, 3, 5, 'they', 'don\'t', 'know', 'that', 'we', 'know', 'that', 'they', 'know' ]; 
const uniqueSet = new Set(arr);
const uniqueArr = Array.from(uniqueSet);
console.log(uniqueArr)


// Задание 7.6.3

const userInput = prompt('Введите любое число:');
const number = Number(userInput);

if (isNaN(number) || number < 0) {
    console.log('Введите корректное неотрицательное число.');
} else {
    const arr = [];
    for (let i = 0; i <= number; i++) {
        arr.push(i);
    }
    console.log(arr);
}


// Задание 7.6.4

const board = [
  ['x', 'o', 'x'],
  ['o', 'x', 'o'],
  ['x', 'o', 'x']
];

for (let i = 0; i < board.length; i++) {
    let row = '';
    for (let j = 0; j < board[i].length; j++) {
        row += board[i][j] + ' ';
    }
    console.log(row.trim());
}


// Задание 7.6.5

const obj = {
  some: 'some',
  dom: 'text',
  arr: [1, 2, 3, 4, 5],
  tom: 'there'
};
const arrValues = [];

for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
        arrValues.push(...value);
    } else {
        arrValues.push(value);
    }
}

console.log(arrValues);
