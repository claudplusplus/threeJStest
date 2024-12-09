import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const canvas = document.querySelector('canvas.webgl');

const sizes = 
{
  width: window.innerWidth,
  height: window.innerHeight
};

const scene = new three.Scene();


const obj = new three.BufferGeometry();
// const posArr = new Float32Array
// (
//   [
//     0,0,0,
//     0,1,0,
//     1,0,0
//   ]
// );

const count = 50;
const posArr = new Float32Array(count * 3 * 3);
for(let i = 0; i < count * 3 * 3; i++)
{
  posArr[i] = (Math.random() - 0.5) * 4;
}

const posAtrrib = new three.BufferAttribute(posArr, 3);
obj.setAttribute('position', posAtrrib);


const mat = new three.MeshBasicMaterial({color: 0xff3100, wireframe: true});
const mesh = new three.Mesh(obj, mat);
scene.add(mesh);


const cam = new three.PerspectiveCamera(75, sizes.width/sizes.height);
cam.position.z = 3;
scene.add(cam);

const control = new OrbitControls(cam, canvas);
control.enableDamping = true;


window.addEventListener('resize', () =>
{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  cam.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
  
  cam.updateProjectionMatrix();
}) 


window.addEventListener('dblclick', () =>
{
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if(!fullscreenElement)
  {
    if(canvas.requestFullscreen)
    {
      canvas.requestFullscreen();
    }
    else if(canvas.webkitFullscreenElement)
    {
      canvas.webkitFullscreenElement();
    }
  }
  else
  {
    if(document.exitFullscreen)
    {
      document.exitFullscreen();
    }
    else if(document.webkitFullscreenElement)
    {
      document.webkitFullscreenElement();
    }
  }
})

const renderer = new three.WebGLRenderer
({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,cam);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const tick = () =>
{
  control.update();
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
}

tick();

