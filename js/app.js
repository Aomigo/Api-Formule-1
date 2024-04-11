const driverButton = document.querySelector('.drivers')
const ecurie = document.querySelector('.ecuries')
const news = document.querySelector('.news')
const menu = document.querySelector('.menu-btn')

const alpineBtn = document.querySelector('.alpine-btn')
const alpine = document.querySelector('.alpine')

const astonBtn = document.querySelector('.aston-martin-btn')
const aston = document.querySelector('.aston-martin')

const ferrariBtn = document.querySelector('.ferrari-btn')
const ferrari = document.querySelector('.ferrari')

const haasBtn = document.querySelector('.haas-btn')
const haas = document.querySelector('.haas')

const mcLarenBtn = document.querySelector('.mclaren-btn')
const mcLaren = document.querySelector('.mclaren')

const mercedesBtn = document.querySelector('.mercedes-btn')
const mercedes = document.querySelector('.mercedes')

const racingBullsBtn = document.querySelector('.racing-bulls-btn')
const racingBulls = document.querySelector('.racing-bulls')

const redBullBtn = document.querySelector('.red-bull-btn')
const redBull = document.querySelector('.red-bull')

const stakeBtn = document.querySelector('.stake-btn')
const stake = document.querySelector('.stake')

const williamsBtn = document.querySelector('.williams-btn')
const williams = document.querySelector('.williams')


menu.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    ferrari.classList.add('hidden')
    alpine.classList.add('hidden')
    aston.classList.add('hidden')
    haas.classList.add('hidden')
    mcLaren.classList.add('hidden')
    mercedes.classList.add('hidden')
    racingBulls.classList.add('hidden')
    redBull.classList.add('hidden')
    stake.classList.add('hidden')
    williams.classList.add('hidden')
    news.classList.remove('hidden')

})

driverButton.addEventListener('click', function(e){
    news.classList.add('hidden')
    ferrari.classList.add('hidden')
    alpine.classList.add('hidden')
    aston.classList.add('hidden')
    haas.classList.add('hidden')
    mcLaren.classList.add('hidden')
    mercedes.classList.add('hidden')
    racingBulls.classList.add('hidden')
    redBull.classList.add('hidden')
    stake.classList.add('hidden')
    williams.classList.add('hidden')
    ecurie.classList.remove('hidden')
})

ferrariBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    ferrari.classList.remove('hidden')
})

alpineBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    alpine.classList.remove('hidden')
})

astonBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    aston.classList.remove('hidden')
})

haasBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    haas.classList.remove('hidden')
})

mcLarenBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    mcLaren.classList.remove('hidden')
})

mercedesBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    mercedes.classList.remove('hidden')
})

racingBullsBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    racingBulls.classList.remove('hidden')
})

redBullBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    redBull.classList.remove('hidden')
})

stakeBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    stake.classList.remove('hidden')
})

williamsBtn.addEventListener('click', function(e){
    ecurie.classList.add('hidden')
    williams.classList.remove('hidden')
})