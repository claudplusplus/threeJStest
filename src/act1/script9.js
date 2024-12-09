import jjkprison from '/textures/jjk/prisom.jpg'
import cobble from '/textures/jjk/cobble.png'
import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl');

const sizes = 
{
  width: window.innerWidth,
  height: window.innerHeight
};

const scene = new three.Scene();
const img = new Image();

// const texture = new three.Texture(img);
// img.addEventListener('load', () =>
// {
//   texture.needsUpdate = true
// })

const loadingManager = new three.LoadingManager();
loadingManager.onStart = () =>
{
  console.log('loading started');
}
loadingManager.onLoad = () =>
{
  console.log('loading finished');
}
loadingManager.onProgress = () =>
{
  console.log('loading progressing');
}
loadingManager.onError = () =>
{
  console.log('loading error');
}

const textureLoad = new three.TextureLoader(loadingManager);
const prisonTexture = textureLoad.load(jjkprison);
const cobbleTexture = textureLoad.load(cobble);

// prisonTexture.repeat.x = 2
// prisonTexture.repeat.y = 3
// prisonTexture.wrapS = three.RepeatWrapping;
// prisonTexture.wrapT = three.RepeatWrapping;
// prisonTexture.wrapS = three.MirroredRepeatWrapping
// prisonTexture.wrapT = three.MirroredRepeatWrapping
// prisonTexture.offset.x = 0.5
// prisonTexture.offset.y = 0.5
// prisonTexture.rotation = Math.PI * 0.25
prisonTexture.generateMipmaps = false;
prisonTexture.minFilter = three.NearestFilter;


img.src = jjkprison 
const obj = new three.BoxGeometry(1,1,1);
// const obj = new three.SphereGeometry(1, 32, 32)
const mat = new three.MeshBasicMaterial({map: prisonTexture});
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


const tick = () =>
{
  control.update();
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
}

tick();
