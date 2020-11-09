import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import './styles/App.scss';

class Scene extends Component {
  mount: any
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  material: THREE.MeshBasicMaterial
  renderer: THREE.WebGLRenderer
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
  frameId: any
  plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  controls: OrbitControls;
  
  constructor(props:any) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    // SET SCENE
    const scene = new THREE.Scene()
    // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    // scene.add( light );

    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = 1;

    // AXIS ARROWS
    const dir_x = new THREE.Vector3( 1, 0, 0 );
    const dir_y = new THREE.Vector3( 0, 1, 0 );
    const dir_z = new THREE.Vector3( 0, 0, 1 );

    const hex_x = 0xeb3434;
    const hex_y = 0x34eb68;
    const hex_z = 0x348ceb;

    const arrowHelper_x = new THREE.ArrowHelper( dir_x, origin, length, hex_x );
    const arrowHelper_y = new THREE.ArrowHelper( dir_y, origin, length, hex_y );
    const arrowHelper_z = new THREE.ArrowHelper( dir_z, origin, length, hex_z );
    scene.add( arrowHelper_x );
    scene.add( arrowHelper_y );
    scene.add( arrowHelper_z );

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#ffffff')
    renderer.setSize(width, height)

    // DEFINE CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.position.x = 4
    camera.position.y = 4
    camera.position.z = 4
    camera.lookAt( new THREE.Vector3(0, 0, 0) )

    const controls = new OrbitControls( camera, renderer.domElement );

    // MATERIALS
    const material = new THREE.MeshBasicMaterial({ color: '#0076a8' })
    const material_model = new THREE.MeshPhongMaterial( { color: 0x2194ce, specular: 0x111111, shininess: 0 } );

    // HELPING GEOMETRY
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const cube = new THREE.Mesh(geometry, material)

    const plane_geo = new THREE.PlaneGeometry(3, 10)
    const plane = new THREE.Mesh(plane_geo, material)
    plane.lookAt(new THREE.Vector3(0, 0, 1))

    // scene.add(cube)
    // scene.add(plane)

    // MODEL
    
    const loader = new STLLoader();

    loader.load( './assets/model.stl', function ( geometry ) {

      const mesh = new THREE.Mesh( geometry, material );

      mesh.position.set( 0, 0, 0 );
      mesh.rotation.set( 0, 0, 0 );
      mesh.scale.set( 1, 1, 1 );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add( mesh );

    } );

    this.scene = scene
    this.camera = camera
    this.controls = controls
    this.renderer = renderer
    this.material = material
    this.cube = cube
    this.plane = plane

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.cube.rotation.x += 0.001
    this.cube.rotation.y += 0.001

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  resize() {
    var width = this.renderer.domElement.clientWidth;
    var height = this.renderer.domElement.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width/height;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    let className = 'container container__scene'
    
    return (
      <div
        className={className}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene