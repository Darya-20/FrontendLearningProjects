// Задание 8.7.1

function printInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
}

//const name = prompt('Введите имя');
//const age = prompt('Введите возраст');

const person = {
    name: 'Иван',
    age: 20
};

printInfo.call(person);


// Задание 8.7.2

function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                throw new Error('Деление на ноль невозможно');
            }
            return a / b;
        default:
        throw new Error(`Неподдерживаемый оператор: ${operator}`);
    }
}

const context = {};
const args = [2, 3, '+'];

try {
    const result = calculate.apply(context, args);
    console.log(result); 
} catch (error) {
    console.log(error.message);
}

// Задание 8.7.3

const users = [
    {name: "Анна", age: 25},
    {name: "Борис", age: 16},
    {name: "Виктория", age: 17},
    {name: "Дмитрий", age: 18},
    {name: "Елена", age: 15},
    {name: "Фёдор", age: 18},
    {name: "Галина", age: 22},
    {name: "Иван", age: 14},
    {name: "Мария", age: 30},
    {name: "Николай", age: 45}
]

const filteredUsers = users.filter(user => user.age >= 18);
const namesUsers = filteredUsers.map(user => user.name);

console.log(filteredUsers);
console.log(namesUsers);


// Задание 8.7.4

function setFullName(fullName) {
    this.fullName = fullName;
}

const person = {firstName: "John", lastName: "Smith"}

const setPersonFullName = setFullName.bind(person)
setPersonFullName("John Smith")

console.log(person)


// Задание 8.7.5

function getUniqueSorted(numbers) {
    const uniqueNumbers = Array.from(new Set(numbers));
    const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
    return sortedNumbers;
}

const numbers = [
    3, 17, 8, 3, 42, 15, 8, 29, 6, 11,
    17, 5, 22, 9, 3, 37, 15, 8, 25, 7,
    19, 12, 4, 17, 33, 10, 6, 23, 1, 15,
    40, 13, 7, 28, 5, 18, 9, 33, 3, 11,
    26, 16, 4, 21, 19, 35, 19, 8, 12, 27
]

const sortedNumbers = getUniqueSorted(numbers);

console.log(sortedNumbers);
