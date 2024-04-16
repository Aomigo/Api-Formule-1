const apiUrl = 'http://ergast.com/api/f1/current/last/drivers.json';

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

  console.log(driverData);


  firstNameP.textContent = driverData.givenName;
  lastNameStrong.textContent = driverData.familyName;
  driverTeamP.textContent = driverData.constructor.name;

  if (driverData.nationality) {
    driverFlagDiv.style.backgroundImage = `url(../asset/img/C/F1Flag/${driverData.nationality.toLowerCase()}.png)`;
  }

  driverImage.src = `../asset/img/C/FichePilote/${driverData.familyName.toLowerCase()}.png`;
  driverImage.alt = driverData.familyName;
  driverNumberImage.src = `../asset/img/C/PiloteSVG/${driverData.familyName.toLowerCase()}.svg`;
  driverNumberImage.alt = `number of ${driverData.familyName}`;

  console.log(driverData.familyName.toLowerCase());

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
  fetch(apiUrl)
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
