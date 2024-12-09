import * as three from 'three'

// connect the canvas from the html
const canvas = document.querySelector('canvas.webgl');

// scene
const scene = new three.Scene();

// // object --------------------
// const geometry = new three.BoxGeometry(1,1,1);
// const mat = new three.MeshBasicMaterial({color: 0xff0000});
// const mesh = new three.Mesh(geometry,mat);

// mesh.position.y = -0.7;
// mesh.position.z = 1.2;

// mesh.scale.y = 1.2
// mesh.scale.z = 1.5

// mesh.rotation.x =  Math.PI * 0.3
// mesh.rotation.y =  -1 * (Math.PI * 0.2)
// mesh.rotation.z = Math.PI * 0.1

// scene.add(mesh);
// console.log(mesh.position.length());
//-------------------------


// group object --------------
const group = new three.Group();
group.scale.y = 2;
group.rotation.y = 0.4;
scene.add(group);

const c1 = new three.Mesh(
  new three.BoxGeometry(1,1,1),
  new three.MeshBasicMaterial({color: 0xff4400})
)
c1.position.x = -1.5;
group.add(c1);

const c2 = new three.Mesh(
  new three.BoxGeometry(1,1,1),
  new three.MeshBasicMaterial({color: 0xff4400})
)
c2.position.x = 0;
group.add(c2);

const c3 = new three.Mesh(
  new three.BoxGeometry(1,1,1),
  new three.MeshBasicMaterial({color: 0xff4400})
)
c3.position.x = 1.5;
group.add(c3);
// --------------------

// sizes
const sizes =
{
  width: window.innerWidth,
  height: window.innerHeight
};


// camera
const cam = new three.PerspectiveCamera(75, sizes.width / sizes.height);
cam.position.z = 6;
scene.add(cam);

// console.log(mesh.position.distanceTo(cam.position));


// axes helper
const axHelper = new three.AxesHelper(2);
scene.add(axHelper);

// renderer
const renderer = new three.WebGLRenderer
(
  {
    canvas: canvas
  }
);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, cam);
