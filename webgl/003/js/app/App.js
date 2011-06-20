/**
 * 
 */

if (!Detector.webgl) Detector.addGetWebGLMessage();

var mouseX = 0, 
	mouseY = 0,
	WIDTH = window.innerWidth, 
	HEIGHT = window.innerHeight,
	windowHalfX = WIDTH / 2, 
	windowHalfY = HEIGHT / 2,
	
	stats, 
	camera, 
	scene, 
	renderer,
	
	mesh,
	
	renderColor = 0x000000,
	
	CAMERA_POS = 50,
	VIEW_ANGLE = 45, 
	ASPECT = WIDTH / HEIGHT, 
	NEAR = 0.1, 
	FAR = 10000;

setup();

function setup ()
{
	// create container
	container = document.createElement('div');
	document.body.appendChild(container);

	// stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	// renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		clearAlpha: 1,
		sortObjects: false,
		sortElements: false
	});
	
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(renderColor);

	// camera
	camera = new THREE.Camera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.z = CAMERA_POS;

	// scene
	scene = new THREE.Scene();

	// add renderer to stage
	container.appendChild(renderer.domElement);

	// draw
	draw();

	// add document listeners
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onDocumentResize, false);

	// update
	update();
}

function draw ()
{
	loader = new THREE.JSONLoader();
	loader.load( { model: "3d/outfile.js", callback: function( geometry ) { createScene(geometry); } } );
}

function createScene(geometry) 
{
	mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({wireframe:true}));
	scene.addChild(mesh);
}

function update ()
{
	requestAnimationFrame(update);
	render();
	stats.update();
}

function render ()
{
	var ry = mouseX * 0.005, rx = mouseY * 0.001;
	 
	if( mesh ) {

		mesh.rotation.y = ry;
		mesh.rotation.x = rx;

	}

	renderer.render(scene, camera);
}

// HANDLERS

function onDocumentResize (event)
{
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;

	renderer.setSize(WIDTH, HEIGHT);
}

function onDocumentMouseMove (event)
{
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart (event)
{
	if (event.touches.length > 1)
	{
		event.preventDefault();

		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
	}
}

function onDocumentTouchMove (event)
{
	if (event.touches.length == 1)
	{
		event.preventDefault();

		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
	}
}