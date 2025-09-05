AFRAME.registerComponent('click-animate', {
  init: function () {
    const el = this.el;
    el.addEventListener('click', () => {
      // Changer la couleur
      const colors = ['#EF2D5E', '#4CC3D9', '#FFC65D', '#7BC8A4', '#F0F000'];
      el.setAttribute('material', 'color', colors[Math.floor(Math.random() * colors.length)]);

      // Supprimer les animations existantes pour relancer proprement
      el.removeAttribute('animation__scale');
      el.removeAttribute('animation__rotatefast');

      // Animation scale
      el.setAttribute('animation__scale', {
        property: 'scale',
        from: el.getAttribute('scale').x + ' ' + el.getAttribute('scale').y + ' ' + el.getAttribute('scale').z,
        to: '2 2 2',
        dur: 500,
        dir: 'alternate',
        loop: 1
      });

      // Animation rotation
      el.setAttribute('animation__rotatefast', {
        property: 'rotation',
        from: el.getAttribute('rotation').x + ' ' + el.getAttribute('rotation').y + ' ' + el.getAttribute('rotation').z,
        to: '0 720 0',
        dur: 1000,
        loop: 1
      });
    });
  }
});
