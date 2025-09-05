AFRAME.registerComponent('click-color-scale-rotate', {
        init: function () {
          const COLORS = ['#EF2D5E', '#4CC3D9', '#FFC65D', '#7BC8A4', '#F0F000'];
          this.el.addEventListener('click', (evt) => {
            console.log('Boîte cliquée !');
            // Changer la couleur aléatoirement
            const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.el.setAttribute('material', 'color', newColor);

            // Animation de scale
            this.el.setAttribute('animation__scale', {
              property: 'scale',
              to: '2 2 2',
              dur: 500,
              dir: 'alternate',
              loop: 1
            });

            // Animation de rotation rapide
            this.el.setAttribute('animation__rotatefast', {
              property: 'rotation',
              to: '0 720 0',
              dur: 1000,
              loop: 1
            });

            console.log('Boîte cliquée !', evt.detail.intersection.point);
          });
        }
      });