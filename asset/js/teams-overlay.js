const teamColors = {
  'mercedes': '#00D2BE',
  'ferrari': '#DC0000',
  'red_bull': '#1E41FF',
  'mclaren': '#FF8700',
  'aston_martin': '#006F62',
  'alpine': '#0090FF',
  'sauber': '#17f254',
  'rb': '#1c3ace',
  'haas': '#0003',
  'williams': '#0082FA'
};

const main = document.querySelector('main');

export function createTeamOverlay(teamName) {
  openOverlay();

  const overlayWrap = document.createElement('div');
  const teamsDiv = document.createElement('div');
  const teamInfosDiv = document.createElement('div');
  const teamNameHeading = document.createElement('h2');
  const teamLogoImg = document.createElement('img');
  const teamDriversDiv = document.createElement('div');
  const loadingBar = document.createElement('div');

  overlayWrap.classList.add('team-overlay__wrap');
  teamsDiv.classList.add('teams');
  teamInfosDiv.classList.add('team-infos');
  teamDriversDiv.classList.add('team-drivers');
  loadingBar.classList.add('loading-bar');

  teamNameHeading.textContent = teamName.name;
  teamLogoImg.src = `../asset/img/C/TeamsPNG/${teamName.constructorId.toLowerCase()}.png`;
  teamLogoImg.alt = 'team logo';

  if (teamColors.hasOwnProperty(teamName.constructorId.toLowerCase())) {
    const color = teamColors[teamName.constructorId.toLowerCase()];
    teamNameHeading.style.borderColor = color;
    teamsDiv.style.borderColor = color;
  }
  teamDriversDiv.appendChild(loadingBar);

  fetch(`http://ergast.com/api/f1/current/results.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      teamDriversDiv.removeChild(loadingBar);
      data.MRData.RaceTable.Races[0].Results.forEach(driver => {
        if (driver.Constructor.constructorId === teamName.constructorId.toLowerCase()) {
          const driverDiv = document.createElement('div');
          const nameDiv = document.createElement('div');
          const firstNameP = document.createElement('p');
          const lastNameStrong = document.createElement('strong');
          const driverImg = document.createElement('img');

          driverDiv.classList.add('driver');
          nameDiv.classList.add('name');
          firstNameP.classList.add('firstName');
          lastNameStrong.classList.add('lastName');

          firstNameP.textContent = driver.Driver.givenName;
          lastNameStrong.textContent = driver.Driver.familyName;
          driverImg.src = `../asset/img/C/FichePilote/${driver.Driver.familyName.toLowerCase()}.png`;
          driverImg.alt = '';

          if (teamColors.hasOwnProperty(driver.Constructor.constructorId.toLowerCase())) {
            const color = teamColors[driver.Constructor.constructorId.toLowerCase()];
            nameDiv.style.borderColor = color;
          }

          nameDiv.appendChild(firstNameP);
          nameDiv.appendChild(lastNameStrong);
          driverDiv.appendChild(nameDiv);
          driverDiv.appendChild(driverImg);

          teamDriversDiv.appendChild(driverDiv);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching team data:', error);
    });

  const closeButton = document.createElement('button');
  closeButton.classList.add('closeOverlay');
  closeButton.innerHTML = '<i class="lni lni-close"></i>';
  closeButton.addEventListener('click', () => {
    overlayWrap.remove();
    closeOverlay();
  });

  teamInfosDiv.appendChild(teamNameHeading);
  teamInfosDiv.appendChild(teamLogoImg);
  teamsDiv.appendChild(teamInfosDiv);
  teamsDiv.appendChild(teamDriversDiv);
  teamsDiv.appendChild(closeButton);
  overlayWrap.appendChild(teamsDiv);

  main.appendChild(overlayWrap);
}

function openOverlay() {
  window.scrollTo({ top: 0, 'scroll-behavior': 'smooth' });
  document.body.classList.add('overlay-open');
}


function closeOverlay() {
  document.body.classList.remove('overlay-open');
}


