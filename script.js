function readStickAxes(axis){
    // Certains profils/émulateurs envoient les sticks sur [2,3]
    const ax = axis || [];
    let x = ax[0] ?? 0, y = ax[1] ?? 0;
    if (Math.abs(x) < 0.001 && Math.abs(y) < 0.001 && ax.length >= 4) {
      x = ax[2] ?? 0; y = ax[3] ?? 0;
    }
    return {x, y};
  }
  function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

  // Joystick gauche = déplacement (g/d inversé corrigé)
  AFRAME.registerComponent('left-stick-move', {
    schema: { speed: {type:'number', default:3}, deadzone:{type:'number', default:0.05} },
    init() {
      this.axis = {x:0,y:0};
      this.rig  = document.querySelector('#rig');
      this.cam  = document.querySelector('#head');
      this.el.addEventListener('axismove', e => { this.axis = readStickAxes(e.detail.axis); });
    },
    tick(t,dt){
      if(!this.rig||!this.cam) return;
      const s = this.data.speed*(dt/1000);
      let {x,y} = this.axis;
      if (Math.hypot(x,y) < this.data.deadzone) return;

      const yaw=(this.rig.getAttribute('rotation')?.y||0)+(this.cam.getAttribute('rotation')?.y||0);
      const rad=THREE.MathUtils.degToRad(yaw);
      const forward=new THREE.Vector3(-Math.sin(rad),0,-Math.cos(rad));
      const right  =new THREE.Vector3().crossVectors(forward,new THREE.Vector3(0,1,0)).negate();

      this.rig.object3D.position
        .addScaledVector(forward, -y*s)  // avancer/reculer (inverse si tu préfères)
        .addScaledVector(right,   -x*s); // gauche/droite (inversé corrigé)
    }
  });

  // Joystick droit = yaw (VR+desktop) + pitch (desktop seulement)

AFRAME.registerComponent('right-stick-turn', {
  schema:{ turnSpeed:{type:'number',default:120}, deadzone:{type:'number',default:0.08} },
  init(){
    this.x=0; this.y=0;
    this.rig   = document.querySelector('#rig');
    this.pitch = document.querySelector('#pitch'); // ⬅️ on cible le pivot
    this.el.addEventListener('axismove', e => {
      const a = readStickAxes(e.detail.axis);
      this.x = a.x; this.y = a.y;
    });
  },
  tick(t,dt){
    if(!this.rig) return;
    const s = this.data.turnSpeed * (dt/1000);

    // Yaw (gauche/droite) – sens inversé (comme avant)
    let x=this.x;
    if (Math.abs(x) >= this.data.deadzone) {
      const rot=this.rig.getAttribute('rotation')||{x:0,y:0,z:0};
      rot.y -= Math.sign(x)*Math.pow(Math.abs(x),1.3)*s;
      this.rig.setAttribute('rotation', rot);
    }

    // Pitch (haut/bas) — en VR ET en desktop via le pivot
    if (this.pitch && Math.abs(this.y) >= this.data.deadzone) {
      const pr=this.pitch.getAttribute('rotation')||{x:0,y:0,z:0};
      pr.x = clamp(pr.x + (-this.y)*s, -80, 80); // -y = mapping naturel
      this.pitch.setAttribute('rotation', pr);
    }
  }
});      
      
      
document.querySelector('a-scene').addEventListener('loaded', () => {
  ['left','right'].forEach(id=>{
    const el=document.getElementById(id);
    el.addEventListener('axismove', e=>console.log(id,'axes',e.detail.axis));
    el.addEventListener('buttonchanged', e=>console.log(id,'button',e.detail));
  });
});