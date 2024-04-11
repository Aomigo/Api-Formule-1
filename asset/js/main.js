function addResult(e) {
  let race = e.MRData.RaceTable.Races[0];
  let winner = race.Results[0];
  let otherDrivers = race.Results.slice(1);
  console.log(otherDrivers);

  const winnerFirstName = document.querySelector('#winner-first-name');
  const winnerLastName = document.querySelector('#winner-last-name');
  const winnerImageElement = document.querySelector('#winner-image');
  const winnerTimeElement = document.querySelector('#winner-time');
  const winnerPositionElement = document.querySelector('#winner-position');
  const otherDriversContainer = document.querySelector('#other-drivers');

  winnerFirstName.textContent = `${winner.Driver.givenName}`;
  winnerLastName.textContent = `${winner.Driver.familyName}`;
  winnerImageElement.src = `./asset/img/C/FichePilote/${(winner.Driver.familyName).toLowerCase()}.png`;
  winnerTimeElement.textContent = winner.Time.time;
  winnerPositionElement.textContent = winner.position;

  otherDrivers.forEach(driver => {
    const driverElement = document.createElement('div');
    driverElement.classList.add('drivers-wrap');
    driverElement.style.backgroundImage = `url(./asset/img/C/F1Flag/${(driver.Driver.nationality.toLowerCase())}.png)`;

    const strongElement = document.createElement('strong');
    strongElement.textContent = driver.position;

    const imgElement = document.createElement('img');
    imgElement.src = `./asset/img/C/FichePilote/${driver.Driver.familyName}.png`; 
    imgElement.alt = `${driver.position} place`;

    const pElement = document.createElement('p');
    pElement.classList.add('time');

    // Vérifier si le temps est disponible
    if (driver.Time && driver.Time.time) {
      pElement.textContent = `${driver.Time.time}`;
    } else {
      pElement.textContent = `${driver.status}`
      pElement.style.fontWeight = "bold"
    }

    driverElement.appendChild(strongElement);
    driverElement.appendChild(imgElement);
    driverElement.appendChild(pElement);

    otherDriversContainer.appendChild(driverElement);
  });

}

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://ergast.com/api/f1/current/last/results.json')
    .then(response => response.json())
    .then(data => {
      addResult(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
