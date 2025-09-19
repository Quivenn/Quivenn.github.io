const cube = document.querySelector('#cube');
    const sphere = document.querySelector('#sphere');

    // Joystick events via axismove
    document.querySelector('#leftHand').addEventListener('axismove', e => {
    console.log('LEFT axismove', e.detail.axis);
    cube.setAttribute('color', 'lime');
    setTimeout(() => cube.setAttribute('color', 'tomato'), 200);
    });

    document.querySelector('#rightHand').addEventListener('axismove', e => {
    console.log('RIGHT axismove', e.detail.axis);
    sphere.setAttribute('color', 'lime');
    setTimeout(() => sphere.setAttribute('color', 'blue'), 200);
    });

    // Boutons
    document.querySelector('#leftHand').addEventListener('buttondown', e => {
    console.log('LEFT buttondown', e.detail);
    });
    document.querySelector('#rightHand').addEventListener('buttondown', e => {
    console.log('RIGHT buttondown', e.detail);
    });

    // Fallback gamepads poll (Quest 2 remonte tout ici)
    setInterval(() => {
    const pads = navigator.getGamepads();
    for (let i = 0; i < pads.length; i++) {
        const gp = pads[i];
        if (!gp) continue;
        if (gp.axes && gp.axes.length) {
        console.log('Gamepad', i, gp.id, gp.axes);
        }
        if (gp.buttons && gp.buttons.length) {
        gp.buttons.forEach((b, idx) => {
            if (b.pressed) console.log('Gamepad', i, 'button', idx, 'pressed');
        });
        }
    }
    }, 500);