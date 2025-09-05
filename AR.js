      // Récupère la boîte
      const box = document.querySelector('#myBox');

      // Rends la boîte "cliquable"
      box.classList.add('clickable');

      // Ajoute un écouteur de clic
      box.addEventListener('click', function () {
        // Change de couleur aléatoire
        const colors = ['#EF2D5E', '#4CC3D9', '#FFC65D', '#7BC8A4', '#F0F000'];
        this.setAttribute('color', colors[Math.floor(Math.random() * colors.length)]);
        
        // Ajoute une animation supplémentaire (scale ou rotation rapide)
        this.setAttribute('animation__scale', {
          property: 'scale',
          to: '2 2 2',
          dur: 500,
          dir: 'alternate',
          loop: 1
        });

        this.setAttribute('animation__rotatefast', {
          property: 'rotation',
          to: '0 720 0',
          dur: 1000,
          loop: 1
        });
      });