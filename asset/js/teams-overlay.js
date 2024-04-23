document.addEventListener("DOMContentLoaded", () => {
  const BtnVM = document.querySelectorAll('.buttton-VM')
  
  BtnVM.forEach(team => {
    BtnVM.addEventListener('click', () => {
      const teamName = team.dataset.team;
      const url = `index.html/${teamName}`;
      window.history.pushState({}, '', url);
      
      // Ensuite, vous pouvez mettre à jour l'affichage de votre page en fonction de l'écurie sélectionnée
    });
  });
});
