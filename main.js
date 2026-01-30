import * as THREE from 'https://cdn.jsdelivr.net/npm/three@181/build/three.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 10000;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 10, 40 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 15, 0 );
	
	controls.maxAzimuthAngle = ToEul(70);  // limit right
	controls.minAzimuthAngle = ToEul(-70); // limit left
	controls.minPolarAngle = ToEul(30);    // limit bottom
	controls.maxPolarAngle = ToEul(80);   // limit top
	controls.minDistance = 10;             // limit dolly forward

	// i made this function for ease of use 
	
	function ToEul(deg) {
		const x = (3.14159265359 / 180) * deg;
		return (x);
	}
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color().setHex( 0x202125);




	
	{

const loader = new GLTFLoader();
loader.load(
    'gltf/block-001.glb',
    ( gltf ) => {
        // called when the resource is loaded
        scene.add( gltf.scene );
		gltf.scene.position.set( 0, 1, 0 );
		
    },
    ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
);

	}


	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );


	}





	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render() {

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

console.log(THREE.REVISION);
main();

