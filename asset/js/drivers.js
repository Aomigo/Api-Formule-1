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
  'haas': '#FFFFFF',
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
            if (result.Constructor.constructorId.toLowerCase() === 'haas') {
              divBorderColor.style.marginLeft = "5px";
              driverInfos.style.backgroundColor = 'rgba(0, 0, 0, 0.100)'
            }
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

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${apiUrl}drivers.json`)
    .then((response) => response.json())
    .then((data) => {
      const driversContainer = document.querySelector('main');
      data.MRData.DriverTable.Drivers.forEach(driverData => {
        const driverElement = createDriverElement(driverData);
        driversContainer.appendChild(driverElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
