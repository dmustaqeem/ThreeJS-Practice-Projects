import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { SpotLightHelper } from 'three'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5,100,100)


//Texture Loading 
const textureLoader = new THREE.TextureLoader()
const normalTextureSph = textureLoader.load('/Textures/NormalMap.png')

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.color = new THREE.Color(0x292929)
material.normalMap = normalTextureSph


// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xff0000, 0.1)
pointLight.position.x = 10
pointLight.position.y = -10
pointLight.position.z = 4
pointLight.intensity = 1
scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0x0ff000, 0.1)
pointLight2.position.x = -10
pointLight2.position.y =  10
pointLight2.position.z = 4
pointLight2.intensity = 1
scene.add(pointLight2)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//const controls = new OrbitControls(camera,renderer.domElement)


/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0
let mouseZ = 0

let targetX = 0
let targetY = 0
let targetZ = 0

const windowHalfX = window.innerWidth/2
const windowHalfY = window.innerHeight/2

function onDocumentMouseMove(event)
{
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}


window.addEventListener('scroll', (event)=>
{
    // sphere.position.x = window.scrollY * 0.05
    // sphere.position.y = window.scrollY * 0.05
    sphere.position.z = window.scrollY * -0.005
})

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001
    
    

    const elapsedTime = clock.getElapsedTime()
    // Update objects
    sphere.rotation.y= .5 * elapsedTime
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += -0.5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()