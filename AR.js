AFRAME.registerComponent('click-animate', {
  init: function () {
    const el = this.el;
    const COLORS = ['#EF2D5E', '#4CC3D9', '#FFC65D', '#7BC8A4', '#F0F000'];

    // Fonction qui déclenche les animations
    function animate() {
      // Changer la couleur
      const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.setAttribute('material', 'color', newColor);

      // Supprimer les anciennes animations
      el.removeAttribute('animation__scale');
      el.removeAttribute('animation__rotatefast');

      // Animation scale
      el.setAttribute('animation__scale', {
        property: 'scale',
        from: el.getAttribute('scale').x + ' ' + el.getAttribute('scale').y + ' ' + el.getAttribute('scale').z,
        to: '2 2 2',
        dur: 500,
        dir: 'alternate',
        loop: true
      });

      // Animation rotation
      el.setAttribute('animation__rotatefast', {
        property: 'rotation',
        from: el.getAttribute('rotation').x + ' ' + el.getAttribute('rotation').y + ' ' + el.getAttribute('rotation').z,
        to: '720 0 0',
        dur: 1000,
        loop: true
      });
    }

    // Clic via curseur AR.js
    el.addEventListener('click', animate);

    // Clic via souris sur PC
    el.addEventListener('mousedown', animate);
  }
});
