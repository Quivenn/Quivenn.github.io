// script.js
AFRAME.registerComponent('joystick-locomotion', {
  schema: {
    speed: { type: 'number', default: 2.0 },           // mètres / seconde
    rotationSpeed: { type: 'number', default: 90 },    // degrés / seconde
    deadzone: { type: 'number', default: 0.2 }         // seuil pour ignorer bruit joystick
  },

  init: function () {
    // axes courants (mis à jour par axismove)
    this.leftAxis = [0, 0];
    this.rightAxis = [0, 0];

    // éléments contrôleurs — adapte les sélecteurs si besoin
    this.leftHand = document.querySelector('#leftHand');
    this.rightHand = document.querySelector('#rightHand');

    // handlers enregistrés (on stocke pour pouvoir retirer proprement)
    this._onLeftAxis = (evt) => {
      if (evt.detail && Array.isArray(evt.detail.axis)) {
        this.leftAxis = evt.detail.axis.slice(0);
        // affiche les valeurs lues (utile pour debug)
        console.log('[left axismove]', this.leftAxis);
      }
    };

    this._onRightAxis = (evt) => {
      if (evt.detail && Array.isArray(evt.detail.axis)) {
        this.rightAxis = evt.detail.axis.slice(0);
        console.log('[right axismove]', this.rightAxis);
      }
    };

    if (this.leftHand)  this.leftHand.addEventListener('axismove', this._onLeftAxis);
    if (this.rightHand) this.rightHand.addEventListener('axismove', this._onRightAxis);
  },

  tick: function (time, timeDelta) {
    // timeDelta est en ms
    const dt = timeDelta / 1000;
    const deadzone = this.data.deadzone;
    let lx = this.leftAxis[0] || 0;
    let ly = this.leftAxis[1] || 0;
    let rx = this.rightAxis[0] || 0;
    // éliminer le bruit via deadzone
    if (Math.abs(lx) < deadzone) lx = 0;
    if (Math.abs(ly) < deadzone) ly = 0;
    if (Math.abs(rx) < deadzone) rx = 0;

    // --- Déplacement (joystick gauche) ---
    // Mapping : axis[0] = gauche/droite, axis[1] = haut/bas
    // Convention : pousser le stick vers l'avant donne ly < 0 sur beaucoup de manettes,
    //               on veut avancer en poussant vers l'avant => moveZ = -ly
    const moveX = -lx;      // strafe droite = +, gauche = -
    const moveZ = -ly;      // avancer = + (après multiplication par speed)

    if (moveX !== 0 || moveZ !== 0) {
      const speed = this.data.speed;
      const rigObj = this.el.object3D;

      // On applique la translation selon le yaw (rotation Y) du rig seulement.
      const yaw = rigObj.rotation.y;
      const qYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(qYaw).multiplyScalar(moveZ * speed * dt);
      const right   = new THREE.Vector3(1, 0, 0).applyQuaternion(qYaw).multiplyScalar(moveX * speed * dt);

      rigObj.position.add(forward);
      rigObj.position.add(right);
    }

    // --- Rotation (joystick droit) ---
    // rx -> axe X du stick droit : gauche/droite
    if (rx !== 0) {
      // rotationSpeed en degrés/sec -> convertir en radians
      const degPerSec = this.data.rotationSpeed;
      const degDelta = rx * degPerSec * dt; // degrés à appliquer cette frame
      const radDelta = THREE.Math.degToRad(degDelta);
      // On inverse le signe si tu veux que pousser à droite tourne dans l'autre sens.
      this.el.object3D.rotation.y -= radDelta;
    }
  },

  remove: function () {
    if (this.leftHand)  this.leftHand.removeEventListener('axismove', this._onLeftAxis);
    if (this.rightHand) this.rightHand.removeEventListener('axismove', this._onRightAxis);
  }
});
