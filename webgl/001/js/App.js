/**
 * 
 */

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var mouseX = 0, mouseY = 0,

WIDTH = window.innerWidth,
HEIGHT = window.innerHeight,

windowHalfX = WIDTH / 2,
windowHalfY = HEIGHT / 2,

stats, camera, scene, renderer;

setup();

function setup()
{
	// set some camera attributes
	var VIEW_ANGLE = 45,
	    ASPECT = WIDTH / HEIGHT,
	    NEAR = 0.1,
	    FAR = 10000;
	
	// create container
	container = document.createElement('div');
	document.body.appendChild(container);
	
	// stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);
	
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0x000000);
	
	// camera
	camera = new THREE.Camera( VIEW_ANGLE, ASPECT, NEAR, FAR );
	camera.position.z = 300;
	
	// scene
	scene = new THREE.Scene();
	
	// add renderer to stage
	container.appendChild( renderer.domElement );
	
	// draw
	draw();
	
	// add document listeners
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onDocumentResize, false );
	
	// render
	animate();
}

function animate() 
{
	requestAnimationFrame( animate );
	render();
	stats.update();
}

function render()
{
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
	camera.updateMatrix();
	
	var time = new Date().getTime() * 0.0015;

	for(var i = 0; i < scene.objects.length; i++ ) {

		scene.objects[ i ].rotation.y = time * ( i % 2 ? 1 : -1);

	}
	
	renderer.render(scene, camera);
}

function draw()
{
	// drawing sphere
	var radius = 50, segments = 16, rings = 16;
	
	for(var i = 0; i<150; i++)
	{
		var sphereMaterial = new THREE.MeshLambertMaterial({opacity: 1 * Math.random(), color: Math.random() * 0xFFFFFF, wireframe:true});
		var sphere = new THREE.Mesh(new THREE.Sphere(Math.random() * radius, segments, rings), sphereMaterial);
		sphere.position.x = Math.random() * WIDTH - WIDTH / 2;
		sphere.position.y = Math.random() * HEIGHT - HEIGHT / 2;
		sphere.position.z = Math.random() * WIDTH - WIDTH / 2;
		scene.addChild(sphere);
	}
}

// HANDLERS

function onDocumentResize(event)
{
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	
	renderer.setSize(WIDTH, HEIGHT);
}

function onDocumentMouseMove(event) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

	if ( event.touches.length > 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}