const apiUrl = 'http://ergast.com/api/f1/current/last/';

const teamColors = {
  'mercedes': '#00D2BE',
  'ferrari': '#DC0000',
  'red_bull': '#1E41FF',
  'mclaren': '#FF8700',
  'aston_martin': '#006F62',
  'alpine': '#0090FF',
  'sauber': '#17f254',
  'rb': '#1c3ace',
  'haas': '#00000',
  'williams': '#0082FA'
};

function addTeamName(driver, team, apiName, divBorderColor, driverInfos) {
  fetch(`${apiUrl}${apiName}.json`)
    .then((response) => response.json())
    .then((data) => {
      const RaceResults = data.MRData.RaceTable.Races[0].Results;
      RaceResults.forEach((result) => {
        if (result.Driver.familyName.toLowerCase() === driver.toLowerCase()) {
          team.textContent = result.Constructor.name;
          if (teamColors.hasOwnProperty(result.Constructor.constructorId.toLowerCase())) {
            const color = teamColors[result.Constructor.constructorId.toLowerCase()];
            divBorderColor.style.borderColor = color;
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}


function createDriverElement(driverData) {
  const driverDiv = document.createElement('div');
  const infosDriverDiv = document.createElement('div');
  const nameDiv = document.createElement('div');
  const firstNameP = document.createElement('p');
  const lastNameStrong = document.createElement('strong');
  const driverFlagDiv = document.createElement('div');
  const driverPageDiv = document.createElement('div');
  const driverTeamP = document.createElement('p');
  const driverImage = document.createElement('img');
  const driverNumberImage = document.createElement('img');

  driverDiv.classList.add('driver');
  infosDriverDiv.classList.add('infos-driver');
  nameDiv.classList.add('name');
  firstNameP.classList.add('first-name');
  lastNameStrong.classList.add('last-name');
  driverFlagDiv.classList.add('driver-flag');
  driverPageDiv.classList.add('driver-page');
  driverTeamP.classList.add('driver-team');

  firstNameP.textContent = driverData.givenName;
  lastNameStrong.textContent = driverData.familyName;

  if (driverData.nationality) {
    driverFlagDiv.style.backgroundImage = `url(../asset/img/C/F1Flag/${driverData.nationality.toLowerCase()}.png)`;
  }

  addTeamName(driverData.familyName.toLowerCase(), driverTeamP, `results`, nameDiv, infosDriverDiv);

  driverImage.src = `../asset/img/C/FichePilote/${driverData.familyName.toLowerCase()}.png`;
  driverImage.alt = driverData.familyName;
  driverNumberImage.src = `../asset/img/C/PiloteSVG/${driverData.familyName.toLowerCase()}.svg`;
  driverNumberImage.alt = `number of ${driverData.familyName}`;

  driverImage.onclick = () => {
    window.open(driverData.url, '_blank');
  }

  nameDiv.appendChild(firstNameP);
  nameDiv.appendChild(lastNameStrong);
  infosDriverDiv.appendChild(nameDiv);
  infosDriverDiv.appendChild(driverFlagDiv);
  driverPageDiv.appendChild(driverTeamP);
  driverPageDiv.appendChild(driverImage);
  driverPageDiv.appendChild(driverNumberImage);
  driverDiv.appendChild(infosDriverDiv);
  driverDiv.appendChild(driverPageDiv);

  return driverDiv;
}

function createLoadingScreen() {
  const loadingScreen = document.createElement('div');
  const loadingDots = document.createElement('div');

  loadingScreen.classList.add('loading-screen');
  loadingDots.classList.add('loading-dots');

  loadingDots.textContent = 'Loading'

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.textContent = '.'
    loadingDots.appendChild(dot);
  }

  loadingScreen.appendChild(loadingDots);

  return loadingScreen;
}

function showErrorScreen(container, errorMessage) {
  container.innerHTML = '';
  const errorScreen = document.createElement('div');
  const imgError = document.createElement('img')
  const pError = document.createElement('p')

  imgError.src = `../asset/img/error.png`
  pError.textContent = errorMessage;

  errorScreen.classList.add('error-screen')
  errorScreen.appendChild(imgError);
  errorScreen.appendChild(pError);
  container.appendChild(errorScreen);
}

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector('main');
  const h1 = document.querySelector('h1');
  const loadingScreen = createLoadingScreen();
  mainContainer.appendChild(loadingScreen);

  fetch(`${apiUrl}drivers.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      mainContainer.removeChild(loadingScreen);
      h1.classList.remove('hidden')
      data.MRData.DriverTable.Drivers.forEach(driverData => {
        const driverElement = createDriverElement(driverData);
        mainContainer.appendChild(driverElement);
      });
    })
    .catch((error) => {
      showErrorScreen(mainContainer, 'An error occurred while loading data.');
      console.error("Error fetching data:", error);
    });
});
