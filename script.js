      // DEBUG : modifiable
      const DEADZONE = 0.15;            // seuil pour ignorer bruit du stick
      const LEFT_NORMAL_COLOR = 'tomato';
      const LEFT_ACTIVE_COLOR = 'lime';
      const RIGHT_NORMAL_COLOR = 'blue';
      const RIGHT_ACTIVE_COLOR = 'lime';

      document.addEventListener('DOMContentLoaded', () => {
        const leftHand = document.querySelector('#leftHand');
        const rightHand = document.querySelector('#rightHand');
        const cube = document.querySelector('#cube');
        const sphere = document.querySelector('#sphere');

        let leftActive = false;
        let rightActive = false;

        function handleLeft(e) {
          const axes = (e.detail && e.detail.axis) || [];
          const x = axes[0] || 0;
          const y = axes[1] || 0;
          // log pour debug
          console.log('[left axismove]', axes);
          if (Math.abs(x) > DEADZONE || Math.abs(y) > DEADZONE) {
            if (!leftActive) {
              cube.setAttribute('color', LEFT_ACTIVE_COLOR);
              leftActive = true;
            }
          } else {
            if (leftActive) {
              cube.setAttribute('color', LEFT_NORMAL_COLOR);
              leftActive = false;
            }
          }
        }

        function handleRight(e) {
          const axes = (e.detail && e.detail.axis) || [];
          const x = axes[0] || 0;
          const y = axes[1] || 0;
          console.log('[right axismove]', axes);
          if (Math.abs(x) > DEADZONE || Math.abs(y) > DEADZONE) {
            if (!rightActive) {
              sphere.setAttribute('color', RIGHT_ACTIVE_COLOR);
              rightActive = true;
            }
          } else {
            if (rightActive) {
              sphere.setAttribute('color', RIGHT_NORMAL_COLOR);
              rightActive = false;
            }
          }
        }

        // Écouteurs axismove (la plupart des composants emitent 'axismove')
        if (leftHand)  leftHand.addEventListener('axismove', handleLeft);
        if (rightHand) rightHand.addEventListener('axismove', handleRight);

        // Fallback poll: si ta plateforme n'émet pas 'axismove',
        // on lit navigator.getGamepads() régulièrement et on décide left/right selon mapping heuristique.
        // Cela aide à détecter les sticks même sans axismove.
        setInterval(() => {
          const gps = navigator.getGamepads ? navigator.getGamepads() : [];
          // heuristique simple : la plupart des gamepads XR ont des axes arrays par controller
          for (let i = 0; i < gps.length; i++) {
            const g = gps[i];
            if (!g) continue;
            // log (décommente si tu veux voir tous les gamepads)
            // console.log('gamepad', i, g.id, g.axes);
            const axes = g.axes || [];
            // si axes.length >= 2, on suppose que c'est un stick (gauche ou droite)
            if (axes.length >= 2) {
              // heuristique : contrôleurs XR contiennent deux sticks (axes groups).
              // Ici on détecte activité si n'importe quel axe dépasse deadzone.
              const active = axes.some(a => Math.abs(a) > DEADZONE);
              // Pour debug show id
              // console.log('GP', i, g.id, 'active', active, 'axes', axes);
              // On essaie d'affecter: si gamepad index pair -> gauche, impair -> droite (heuristique)
              if (active) {
                if (i % 2 === 0) {
                  if (!leftActive) { cube.setAttribute('color', LEFT_ACTIVE_COLOR); leftActive = true; }
                } else {
                  if (!rightActive) { sphere.setAttribute('color', RIGHT_ACTIVE_COLOR); rightActive = true; }
                }
              } else {
                if (i % 2 === 0) {
                  if (leftActive) { cube.setAttribute('color', LEFT_NORMAL_COLOR); leftActive = false; }
                } else {
                  if (rightActive) { sphere.setAttribute('color', RIGHT_NORMAL_COLOR); rightActive = false; }
                }
              }
            }
          }
        }, 150);
      });