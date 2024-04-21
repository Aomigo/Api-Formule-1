const creatorContainer = document.querySelector('.creator__wrap');

DevOn.forEach(dev => {
  const creatorDiv = document.createElement('div');
  const ppDiv = document.createElement('div');
  const strongElement = document.createElement('a');
  const pElement = document.createElement('p');

  creatorDiv.classList.add('creator');
  ppDiv.classList.add('pp');
  strongElement.classList.add('name');
  pElement.classList.add('work');

  ppDiv.style.backgroundImage = `url(${dev.pp})`;

  ppDiv.onclick = () => {
    window.open(dev.link, '_blank')
  }

  strongElement.textContent = dev.Pseudo;
  strongElement.href = dev.link;
  strongElement.target = "_blank";
  pElement.textContent = dev.Work.join(', ');

  creatorDiv.appendChild(ppDiv)
  creatorDiv.appendChild(strongElement);
  creatorDiv.appendChild(pElement);

  creatorContainer.appendChild(creatorDiv);
});
