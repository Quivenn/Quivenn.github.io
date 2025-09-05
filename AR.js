const box = document.querySelector('#myBox');

      box.addEventListener('click', function () {
        console.log("Boîte cliquée !");
        // Couleurs possibles
        const colors = ['#EF2D5E', '#4CC3D9', '#FFC65D', '#7BC8A4', '#F0F000'];
        this.setAttribute('color', colors[Math.floor(Math.random() * colors.length)]);
        
        // Animation de scale
        this.setAttribute('animation__scale', {
          property: 'scale',
          to: '2 2 2',
          dur: 500,
          dir: 'alternate',
          loop: 1
        });

        // Animation de rotation rapide
        this.setAttribute('animation__rotatefast', {
          property: 'rotation',
          to: '0 720 0',
          dur: 1000,
          loop: 1
        });
      });