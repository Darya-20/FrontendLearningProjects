const entities = [
    {
        city: 'Rostov-on-Don\nLCD admiral',
        repairTime: '3.5 months',
        area: '81 m2',
        repairCost: 'Upon request',
        img: 'images/Rostov-on-Don_Admiral.png'
    },
    {
        city: 'Sochi\nThieves',
        repairTime: '4 months',
        area: '105 m2',
        repairCost: 'Upon request',
        img: 'images/Sochi_Thieves.png'
    },
    {
        city: 'Rostov-on-Don\nPatriotic',
        repairTime: '3 months',
        area: '93 m2',
        repairCost: 'Upon request',
        img: 'images/Rostov-on-Don_Patriotic.png'
    }
]

const city = document.querySelector('#city')
const repairTime = document.querySelector('#repair-time')
const area = document.querySelector('#area')
const repairCost = document.querySelector('#repair-cost')
const slideImage = document.querySelector('.slide-image');
const indicators = document.querySelectorAll('.indicator');
const links = document.querySelectorAll('.links a');

const setEntity = (index) => {
    if (index < 0) {
        currentIndex = entities.length - 1;
    }
    else if (index >= entities.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    city.innerText = entities[currentIndex].city;
    repairTime.innerText = entities[currentIndex].repairTime;
    area.innerText = entities[currentIndex].area;
    repairCost.innerText = entities[currentIndex].repairCost;
    slideImage.src = entities[currentIndex].img;
    slideImage.alt = `Photo ${entities[currentIndex].city}`;

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
    });

    links.forEach((link, i) => {
        link.classList.toggle('active', i === currentIndex);
    });
}

const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
let currentIndex = 0

setEntity(currentIndex);

prev.addEventListener('click', () => {
    setEntity(currentIndex - 1);
})
next.addEventListener('click', () => {
    setEntity(currentIndex + 1);
})  

indicators.forEach(indicator => {
  indicator.addEventListener('click', () => {
    const slideIndex = parseInt(indicator.dataset.slide);
    setEntity(slideIndex);
  });
});

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const slideIndex = parseInt(link.dataset.slide);
    setEntity(slideIndex);
  });
});