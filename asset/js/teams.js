const apiUrl = 'http://ergast.com/api/f1/current/last/';

let iFrameVM = `<i class="fa-solid fa-chevron-right"></i>`

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

function createTeams(teamsData) {
  const $data = teamsData;
  
  const teams = document.createElement('div');
  const teamInfos = document.createElement('div');
  const teamName = document.createElement('h2');
  const teamImg = document.createElement('img');
  const viewMoreWrap = document.createElement('div');
  const viewMoreBtn = document.createElement('button');

  teams.classList.add('teams');
  teamInfos.classList.add('team-infos');
  viewMoreWrap.classList.add('view-more__wrap');

  teams.style.backgroundImage = `url("../asset/img/C/MonoPNG/${$data.constructorId}.png")`;

  teamName.textContent = $data.name;
  teamImg.src = `../asset/img/C/TeamsPNG/${$data.constructorId}.png`;
  viewMoreBtn.innerHTML = `View More ${iFrameVM}`;

  if(teamColors.hasOwnProperty($data.constructorId.toLowerCase())) {
    const color = teamColors[$data.constructorId.toLowerCase()];
    teamName.style.borderColor = color;
    viewMoreBtn.style.borderColor = color;
  }

  if($data.constructorId.toLowerCase() === 'red_bull' || 'rb') {
    teamImg.style.borderRadius = '15px'
    teamImg.style.objectFit = 'cover'
  }

  if($data.constructorId.toLowerCase() === 'haas' || 'williams') {
    teamImg.style.borderRadius = '15px'
    teamImg.style.objectFit = 'contain'
  }


  teamInfos.appendChild(teamName);
  teamInfos.appendChild(teamImg);
  viewMoreWrap.appendChild(viewMoreBtn);

  teams.appendChild(teamInfos);
  teams.appendChild(viewMoreWrap);

  return teams;
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

  fetch(`${apiUrl}constructors.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      h1.classList.remove('hidden');
      mainContainer.removeChild(loadingScreen);
      data.MRData.ConstructorTable.Constructors.forEach(teamsData => {
        const teamElement = createTeams(teamsData);
        mainContainer.appendChild(teamElement);
        console.log(teamsData.constructorId);
      })
    })
    .catch((error) => {
      showErrorScreen(mainContainer, 'An error occurred while loading data.');
      console.error("Error fetching data:", error);
    });
});