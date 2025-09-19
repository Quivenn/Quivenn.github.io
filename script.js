// Rotation avec joystick droit
AFRAME.registerComponent("right-joystick-rotation", {
schema: { speed: { type: "number", default: 1.5 } }, // vitesse rotation
init: function () {
    this.el.addEventListener("axismove", (evt) => {
    if (evt.detail && evt.detail.hand === "right") {
        const [x, y] = evt.detail.axis;
        if (Math.abs(x) > 0.2) {
        this.el.object3D.rotation.y -= x * 0.05 * this.data.speed;
        }
    }
    });
},
});