      // Ce composant permet rotation de la vue (rig) via le joystick droit
      AFRAME.registerComponent("right-joystick-rotate", {
        schema: {
          speed: { type: "number", default: 1.5 },
          threshold: { type: "number", default: 0.2 }
        },
        init: function () {
          this.el.addEventListener("axismove", (evt) => {
            // On filtre pour la main droite
            if (evt.detail && evt.detail.hand === "right") {
              const [x, y] = evt.detail.axis;
              // Utiliser seulement l'axe X pour la rotation (gauche/droite)
              if (Math.abs(x) > this.data.threshold) {
                // Appliquer une rotation sur le rig
                this.el.object3D.rotation.y -= x * 0.05 * this.data.speed;
              }
            }
          });
        }
      });

      // Composant pour le mouvement via joystick gauche
      AFRAME.registerComponent("left-joystick-move", {
        schema: {
          speed: { type: "number", default: 0.1 },
          threshold: { type: "number", default: 0.2 }
        },
        init: function () {
          this.el.addEventListener("axismove", (evt) => {
            if (evt.detail && evt.detail.hand === "left") {
              const [x, y] = evt.detail.axis;
              // y direction: avancer/reculer, x: strafe gauche/droite
              let moveX = 0, moveZ = 0;
              if (Math.abs(y) > this.data.threshold) {
                moveZ = - y * this.data.speed;  // y négatif = avant selon orientation de la manette?
              }
              if (Math.abs(x) > this.data.threshold) {
                moveX = - x * this.data.speed;
              }
              if (moveX !== 0 || moveZ !== 0) {
                const rig = this.el.object3D;
                // se déplacer dans le plan (horizontal), par rapport à l’orientation actuelle
                const forwardVec = new THREE.Vector3(0,0,-1);
                const sideVec    = new THREE.Vector3(-1,0,0);
                forwardVec.applyQuaternion(rig.quaternion);
                sideVec.applyQuaternion(rig.quaternion);
                rig.position.add(forwardVec.multiplyScalar(moveZ));
                rig.position.add(sideVec.multiplyScalar(moveX));
              }
            }
          });
        }
      });