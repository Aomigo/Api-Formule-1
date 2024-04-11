function addResult(e) {
  const race = e.MRData.RaceTable.Races[0];
  const winner = race.Results[0];
  const otherDrivers = race.Results.slice(1);

  const winnerNameElement = document.getElementById('winner-name');
  const winnerImageElement = document.getElementById('winner-image');
  const winnerTimeElement = document.getElementById('winner-time');
  const winnerPositionElement = document.getElementById('winner-position');
  const otherDriversContainer = document.getElementById('other-drivers');

  winnerNameElement.textContent = `${winner.Driver.givenName} ${winner.Driver.familyName}`;
  winnerImageElement.src = `./asset/img/C/FichePilote/${(winner.Driver.familyName).toLowerCase()}.png`;
  winnerTimeElement.textContent = winner.Time.time;
  winnerPositionElement.textContent = winner.position;

  otherDrivers.forEach(driver => {
    const driverElement = document.createElement('div');
    driverElement.classList.add('drivers-wrap');

    const strongElement = document.createElement('strong');
    strongElement.textContent = driver.position;

    const imgElement = document.createElement('img');
    imgElement.src = `./asset/img/C/FichePilote/${driver.Driver.driverId}.png`;
    imgElement.alt = `${driver.position} place`;

    const pElement = document.createElement('p');
    pElement.classList.add('time');
    pElement.textContent = `${driver.Time.time}`;

    driverElement.appendChild(strongElement);
    driverElement.appendChild(imgElement);
    driverElement.appendChild(pElement);

    otherDriversContainer.appendChild(driverElement);
    console.log(driver.Driver.driverId);
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
