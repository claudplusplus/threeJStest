import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import gsap from 'gsap'

const canvas = document.querySelector('canvas.webgl');

const sizes = 
{
  width: window.innerWidth,
  height: window.innerHeight
};

const scene = new three.Scene();

const gui = new dat.GUI();

const param = {
  color: 0x00FFFF,
  spin: () =>
  {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI *2 })
  }
}

const obj = new three.BoxGeometry(1,1,1);
const mat = new three.MeshBasicMaterial({color: param.color});
const mesh = new three.Mesh(obj, mat);
scene.add(mesh);
gui
  .add(mesh.position, 'y')
  .min(- 3)
  .max(3)
  .step(0.01)
  .name('ELEVATE');
gui
  .add(mesh, 'visible')
  .name('VISIBLE')
gui
  .add(mat, 'wireframe')
  .name('WIREFRAME')

gui
  .addColor(param, 'color')
  .onChange(() =>
  {
    mat.color.set(param.color);
  })

gui
  .add(param, 'spin')
  .name('SPIN')

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

