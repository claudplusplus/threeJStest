import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new three.Scene()

 
// texture among us

const textureLoader = new three.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture =
textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture =
textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture =
textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture =
textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture =
textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture =
textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture =
textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture =
textureLoader.load('/textures/grass/roughness.jpg')


/**
 * Lights
 */

const ambientLight = new three.AmbientLight(0xffffff, 0)
ambientLight.color = new three.Color(0xff00ff)
ambientLight.intensity = 0
scene.add(ambientLight)

const directionalLight = new three.DirectionalLight(0x00fffc, 0.25)
scene.add(directionalLight)
directionalLight.position.set(-5, 3, 0)
const directionalLightHelper = new three.DirectionalLightHelper(directionalLight, 0)
scene.add(directionalLightHelper)

const hemisphereLight = new three.HemisphereLight(0xff0000, 0x0000ff, 0)
hemisphereLight.position.x = 5
scene.add(hemisphereLight)
const hemisphereLightHelper = new three.HemisphereLightHelper(hemisphereLight, 0)
scene.add(hemisphereLightHelper)

const pointLight = new three.PointLight(0x00ffff, 0)
pointLight.position.y = 3
scene.add(pointLight)
const pointLightHelper = new three.PointLightHelper(pointLight, 0)
scene.add(pointLightHelper)

// const rectAreaLight = new three.RectAreaLight(0x4e00ff, 2, 1, 1)
// scene.add(rectAreaLight)
// rectAreaLight.position.set(- 1.5, 0, 1.5)
// rectAreaLight.lookAt(new three.Vector3())

const spotLight = new three.SpotLight(0x78ff00, 0, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.y = 5
scene.add(spotLight)
scene.add(spotLight.target)
const spotLightHelper = new three.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

// GUI here
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name("Ambient brightness")
// useless haha
// const ambientLightDrop =  gui.addFolder('AmbientLight Position')
// ambientLightDrop.add(ambientLight.position, 'x', -5, 5, 0.01)
// ambientLightDrop.add(ambientLight.position, 'y', -5, 5, 0.01)
// ambientLightDrop.add(ambientLight.position, 'z', -5, 5, 0.01)

gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name("Directional brightness")
const directionalLightDrop =  gui.addFolder('DirectionalLight Position')
directionalLightDrop.add(directionalLight.position, 'x', -5, 5, 0.01)
directionalLightDrop.add(directionalLight.position, 'y', -5, 5, 0.01)
directionalLightDrop.add(directionalLight.position, 'z', -5, 5, 0.01)
directionalLightDrop.add(directionalLight, 'visible').name("on")
directionalLightDrop.add(directionalLightHelper, 'visible').name("helper")

gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.001).name("Hemispehere brightness")
const hemisphereLightDrop =  gui.addFolder('HemisphereLight Position')
hemisphereLightDrop.add(hemisphereLight.position, 'x', -5, 5, 0.01)
hemisphereLightDrop.add(hemisphereLight.position, 'y', -5, 5, 0.01)
hemisphereLightDrop.add(hemisphereLight.position, 'z', -5, 5, 0.01)
hemisphereLightDrop.add(hemisphereLight, 'visible').name("on")
hemisphereLightDrop.add(hemisphereLightHelper, 'visible').name("helper")

gui.add(pointLight, 'intensity', 0, 1, 0.001).name("PointLight brightness")
const pointLightDrop =  gui.addFolder('PointLight Position')
pointLightDrop.add(pointLight.position, 'x', -5, 5, 0.01)
pointLightDrop.add(pointLight.position, 'y', -5, 5, 0.01)
pointLightDrop.add(pointLight.position, 'z', -5, 5, 0.01)
pointLightDrop.add(pointLight, 'visible').name("on")
pointLightDrop.add(pointLightHelper, 'visible').name("helper")


gui.add(spotLight, 'intensity', 0, 1, 0.001).name("SpotLight brightness")
const spotLightDrop =  gui.addFolder('spotLight Position')
spotLightDrop.add(spotLight.position, 'x', -5, 5, 0.01)
spotLightDrop.add(spotLight.position, 'y', -5, 5, 0.01)
spotLightDrop.add(spotLight.position, 'z', -5, 5, 0.01)
const spotLightTargetDrop =  gui.addFolder('spotlight target Position')
spotLightTargetDrop.add(spotLight.target.position, 'x', -5, 5, 0.01)
spotLightTargetDrop.add(spotLight.target.position, 'y', -5, 5, 0.01)
spotLightTargetDrop.add(spotLight.target.position, 'z', -5, 5, 0.01)
spotLightDrop.add(spotLight, 'visible').name("on")
spotLightDrop.add(spotLightHelper, 'visible').name("helper")



// ambientLightDrop.close()
directionalLightDrop.close()
hemisphereLightDrop.close()
pointLightDrop.close()
spotLightDrop.close()
spotLightTargetDrop.close()
/**
 * Objects
 */
// Material
const material = new three.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new three.Mesh(
    new three.SphereGeometry(0.5, 32, 32),
    material
)

const cube = new three.Mesh(
    new three.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new three.Mesh(
    new three.TorusGeometry(0.3, 0.2, 32, 64),
    material
)

// const plane = new three.Mesh(
//     new three.PlaneGeometry(20, 20),
//     material
// )
const plane = new three.Mesh(
    new three.PlaneGeometry(20, 20),
    new three.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
plane.geometry.setAttribute('uv2', new
three.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2))
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

// shadow
directionalLight.castShadow = true;
pointLight.castShadow = true;
spotLight.castShadow = true;

directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;

sphere.position.x = 9
sphere.position.z = 1
cube.position.x = 9
cube.position.z = 2.5
torus.position.x = 9
torus.position.z = -0.5



sphere.castShadow = true
cube.castShadow = true
torus.castShadow = true
plane.receiveShadow = true

scene.add(sphere, cube, torus, plane)

//house

const house = new three.Group()
scene.add(house)

const walls = new three.Mesh(
    new three.BoxGeometry(4, 2.5, 4),
    new three.MeshStandardMaterial({ 
        map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
    })
    )
    walls.position.y = 0.65
    house.add(walls)


const roof = new three.Mesh(
    new three.ConeGeometry(3.5, 1, 4),
    new three.MeshStandardMaterial({ color: '#b35f45' })
    )
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.35
house.add(roof)

// Door
const door = new three.Mesh(
    new three.PlaneGeometry(2, 2),
    new three.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
    )
door.position.y = 0.4
door.position.z = 2.001
house.add(door)

// Bushes
const bushGeometry = new three.SphereGeometry(1, 16, 16)
const bushMaterial = new three.MeshStandardMaterial({ color: '#89c854' })
const bush1 = new three.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, -0.4, 2.2)
const bush2 = new three.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, -0.6, 2.1)
const bush3 = new three.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, -0.4, 2.2)
const bush4 = new three.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, -0.6, 2.6)
house.add(bush1, bush2, bush3, bush4)


// Graves
const graves = new three.Group()
scene.add(graves)

const graveGeometry = new three.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new three.MeshStandardMaterial({ color: '#b2b6b1' })

for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6 // Random radius
    const x = Math.cos(angle) * radius // Get the x position using cosinus
    const z = Math.sin(angle) * radius // Get the z position using sinus
    // Create the mesh
    const grave = new three.Mesh(graveGeometry, graveMaterial)
    // Position
    grave.position.set(x, -0.4, z)
    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    // Add to the graves container
    graves.add(grave)
}

const moonLight = new three.DirectionalLight('#b9d5ff', 0.12)
const doorLight = new three.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 1.75, 2.7)
house.add(doorLight)

const fog = new three.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})




/**
 * Camera
 */
// Base camera
const camera = new three.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -3
camera.position.y = 3
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new three.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
renderer.setClearColor('#262837') // clear color of the renderer and use the fog color


/**
 * Animate
 */
const clock = new three.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime


    // helpers update
    spotLightHelper.update();
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()