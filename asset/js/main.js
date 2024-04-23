const EEImge = document.querySelector('.easter-eggs')
const otherDriversContainer = document.querySelector("#other-drivers");
const Previous = document.querySelector(".previousSlide");
const Next = document.querySelector(".nextSlide");
Previous.classList.add('hidden')

const teamColors = {
  'mercedes': '#00D2BE',
  'ferrari': '#DC0000',
  'red_bull': '#1E41FF',
  'mclaren': '#FF8700',
  'aston_martin': '#006F62',
  'alpine': '#0090FF',
  'sauber': '#17f254',
  'rb': '#1c3ace',
  'haas': '#FFFFFF',
  'williams': '#0082FA'
};

let translation = 0;
let EE = 0;

function addResult(e) {
  let race = e.MRData.RaceTable.Races[0];
  let winner = race.Results[0];
  let otherDrivers = race.Results.slice(1);

  const raceName = document.querySelector('.gp-name')
  const winnerFirstName = document.querySelector("#winner-first-name");
  const winnerLastName = document.querySelector("#winner-last-name");
  const winnerImageElement = document.querySelector("#winner-image");
  const winnerTimeElement = document.querySelector("#winner-time");
  const winnerPositionElement = document.querySelector("#winner-position");

  raceName.textContent = `${race.raceName} :` 
  
  winnerFirstName.textContent = `${winner.Driver.givenName}`;
  winnerLastName.textContent = `${winner.Driver.familyName}`;
  winnerImageElement.src = `../asset/img/C/FichePilote/${winner.Driver.familyName.toLowerCase()}.png`;
  winnerTimeElement.textContent = winner.Time.time;
  winnerPositionElement.textContent = winner.position;

  winnerImageElement.addEventListener('click', () => {
    EE +=1; 
    if (EE >= 10) {
      EEImge.classList.remove('hidden')
      EEImge.classList.add('animate__tada')
    } if (EE >= 20) {
      EE = 0;
      EEImge.classList.add('hidden')
      EEImge.classList.remove('animate__tada')
    }
  })

  if (teamColors.hasOwnProperty(winner.Constructor.constructorId.toLowerCase())) {
    const color = teamColors[winner.Constructor.constructorId.toLowerCase()];
    winnerTimeElement.style.color = color;
  }  


  otherDrivers.forEach((driver) => {
    const driverElement = document.createElement("div");
    const strongElement = document.createElement("strong");
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");

    driverElement.classList.add("drivers-wrap");
    pElement.classList.add("time");

    driverElement.style.backgroundImage = `url(../asset/img/C/F1Flag/${driver.Driver.nationality.toLowerCase()}.png)`;
    strongElement.textContent = driver.position;
    imgElement.src = `../asset/img/C/FichePilote/${driver.Driver.familyName}.png`;
    imgElement.alt = `${driver.position} place`;

    // Time Check
    if (driver.Time && driver.Time.time) {
      pElement.textContent = `${driver.Time.time}`;
    } else {
      pElement.textContent = `${driver.status}`;
      pElement.style.fontWeight = "bold";
    }

    driverElement.appendChild(strongElement);
    driverElement.appendChild(imgElement);
    driverElement.appendChild(pElement);

    otherDriversContainer.appendChild(driverElement);
  });
}

function getTotalWidth() {
  const driverWraps = document.querySelectorAll('.drivers-wrap');
  let totalWidth = 0;

  driverWraps.forEach(driverWrap => {
    totalWidth += driverWrap.offsetWidth + 30;
  });

  return totalWidth;
}

function resetTranslation() {
  translation = 0;
  const otherDrivers = document.querySelector('.other-drivers');
  otherDrivers.style.transform = 'translateX(0)';
}

function updateTranslation() {
  const otherDrivers = document.querySelector('.other-drivers');
  const totalWidth = getTotalWidth();
  const maxTranslation = totalWidth - window.innerWidth + 25;
  Next.classList.remove('hidden')

  if(translation != 0) {
    Previous.classList.remove('hidden')
  } else if(translation = 350) {
    Previous.classList.add('hidden')
  }

  if (maxTranslation > 0) {
    if (translation > 0) {
      translation = 0;
      Previous.classList.add('hidden')
    } else if (translation < -maxTranslation) {
      translation = -maxTranslation;
      Next.classList.add('hidden')
    }

    otherDrivers.style.transform = `translateX(${translation}px)`;
  } else {
    resetTranslation();
  }
}

function NextSlide() {
  translation -= 350;
  updateTranslation();
}

function PreviousSlide() {
  translation += 350;
  updateTranslation();
}

Next.addEventListener('click', NextSlide);
Previous.addEventListener('click', PreviousSlide);

window.addEventListener('resize', updateTranslation);

let intervalId;

function startInterval() {
  intervalId = setInterval(NextSlide, 5000);
} 

window.addEventListener("resize", () => {
  if (window.innerWidth < 600) {
    resetTranslation();
    clearInterval(intervalId);
  } else {
    if (!intervalId) {
      startInterval();
    }
  }
});

function createLoadingScreen() {
  const loadingScreen = document.createElement('div');
  const loadingDots = document.createElement('div');

  loadingScreen.classList.add('loading-screen');
  loadingDots.classList.add('loading-dots');


  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.textContent = '.'
    loadingDots.appendChild(dot);
  }

  loadingScreen.appendChild(loadingDots);

  return loadingScreen;
}

function showErrorScreen(container, errorMessage, errorType) {
  container.innerHTML = '';
  const errorScreen = document.createElement('div');
  const imgError = document.createElement('img');
  const pError = document.createElement('p');
  const pErrorType = document.createElement('strong');

  imgError.src = `../asset/img/error.png`;
  pError.textContent = errorMessage;
  pErrorType.textContent = errorType;

  errorScreen.classList.add('error-screen');
  errorScreen.appendChild(imgError);
  errorScreen.appendChild(pError);
  errorScreen.appendChild(pErrorType);
  container.appendChild(errorScreen);
}

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector('main');
  const resultsWrap = document.querySelector('.result');
  const loadingScreen = createLoadingScreen();
  mainContainer.appendChild(loadingScreen);

  fetch("http://ergast.com/api/f1/current/last/results.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      mainContainer.removeChild(loadingScreen);
      resultsWrap.classList.remove('hidden');
      addResult(data);
    })
    .catch((error) => {
      showErrorScreen(mainContainer, 'An error occurred while loading data.', error);
      console.error("Error fetching data:", error);
    });
});