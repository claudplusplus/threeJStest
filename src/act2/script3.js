import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lilGUI from 'lil-gui'

const canvas = document.querySelector('canvas.webgl');
const scene = new three.Scene();
const gui = new lilGUI.GUI()

const sizes =
{
  width: window.innerWidth,
  height: window.innerHeight
}


const param = {}
param.count = 4500
param.size = 0.02
param.radius = 3.8
param.branches = 3
param.spin = 1
param.randomness = 0.25
param.randomnessPow = 1
param.insideColor = '#c91870'
param.outsideColor = '#1b3984'


// Optionally, adjust ambient light if necessary
const ambientLight = new three.AmbientLight('#555555', 0.5); // Soft light to illuminate everything slightly
scene.add(ambientLight);

let sphere = null
let pointLight = null

const geometry = new three.BufferGeometry()
const colors = new Float32Array(param.count * 3)

const mats = new three.PointsMaterial({
  size: param.size,
  sizeAttenuation: true,
  depthWrite: false,
  blending: three.AdditiveBlending,
  vertexColors: true
})
const points = new three.Points(geometry, mats)

const genGalaxy = () =>
{ 
  if(points !== null)
  {
    geometry.dispose()
    mats.dispose()
    scene.remove(points)
  }

  if (sphere) {
    sphere.geometry.dispose();
    sphere.material.dispose();
    scene.remove(sphere);
  }

  const pos = new Float32Array(param.count * 3)
  const colorInside = new three.Color(param.insideColor)
  const colorOutside = new three.Color(param.outsideColor)
  
  geometry.setAttribute('position', new three.BufferAttribute(pos, 3))
  geometry.setAttribute('color', new three.BufferAttribute(colors, 3))

  for(let i = 0; i < param.count; i++)
  {
    const i3 = i * 3
    const radius = Math.random() * param.radius
    const branchAngle = (i % param.branches) / param.branches * Math.PI * 2
    const spinAngle = radius * param.spin
    const randomX = Math.pow(Math.random(), param.randomnessPow) * (Math.random() < 0.5 ? 1 : - 1) * param.randomness * radius
    const randomY = Math.pow(Math.random(), param.randomnessPow) * (Math.random() < 0.5 ? 1 : - 1) * param.randomness * radius
    const randomZ = Math.pow(Math.random(), param.randomnessPow) * (Math.random() < 0.5 ? 1 : - 1) * param.randomness * radius

    pos[i3 ] = Math.cos(branchAngle + spinAngle) * radius + randomX // for x
    pos[i3 + 1] = randomY // for y
    pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ // for z

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / param.radius)
    colors[i3 ] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }
  scene.add(points)

  const sphereGeometry = new three.SphereGeometry(0.05,64,64);
  const sphereMaterial = new three.MeshStandardMaterial({
    color: param.insideColor,
    emissive: param.insideColor,
    emissiveIntensity: 0.8,
    roughness: 0.5,
    metalness: 0.3,
  });
  sphere = new three.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  if (!pointLight) {
    pointLight = new three.PointLight(param.insideColor, 1, 50);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
  } else {
    pointLight.color.set(param.insideColor);
  }
}

genGalaxy()

gui.add(param, 'count').min(100).max(1000000).step(100).onFinishChange(genGalaxy)
gui.add(param, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(genGalaxy)
gui.add(param, 'radius').min(0.01).max(20).step(0.01).onFinishChange(genGalaxy)
gui.add(param,'branches').min(2).max(20).step(1).onFinishChange(genGalaxy)
gui.add(param, 'spin').min(-5).max(5).step(0.001).onFinishChange(genGalaxy)
gui.add(param,  'randomness').min(0).max(2).step(0.001).onFinishChange(genGalaxy)
gui.add(param, 'randomnessPow').min(1).max(10).step(0.001).onFinishChange(genGalaxy)
gui.addColor(param, 'insideColor').onFinishChange(genGalaxy)
gui.addColor(param, 'outsideColor').onFinishChange(genGalaxy)

const cam = new three.PerspectiveCamera(75, sizes.width / sizes.height);
cam.position.y = 3.5
cam.position.z = 4
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

const clock = new three.Clock();
const tick = () =>
{
  control.update();
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
}

tick();