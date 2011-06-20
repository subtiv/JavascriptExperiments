/**
 * 
 */

if (!Detector.webgl)
	Detector.addGetWebGLMessage();

var mouseX = 0, mouseY = 0,
WIDTH = window.innerWidth, HEIGHT = window.innerHeight,
windowHalfX = WIDTH / 2, windowHalfY = HEIGHT / 2,
CAMERA_POS = 1300,
stats, camera, scene, renderer;

var pc = 1000,
	psC = 10,
	particleSystems = [],
	particles = [];

setup();

function draw ()
{
	var i = 0, 
		a = 0;
	
	for (a = 0; a<psC; a++)
	{
		var particleHolder = new THREE.Geometry();
	
		for (i = 0; i < pc; i++)
		{
			var pX = ((Math.random() * (WIDTH / psC))) - (WIDTH / 2) + ((WIDTH / psC) * a), 
				pY = -250, 
				pZ = 0, 
				particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
			
			particle.velocity = new THREE.Vector3(0, Math.random() * 10, 0);
			particleHolder.vertices.push(particle);
		}
		
		particles.push(particleHolder);
	
		var pMaterial = new THREE.ParticleBasicMaterial({
			size: 1, 
			blending: THREE.AdditiveBlending,
			color: Math.random() * 0xFFFFFF
		});
		
		var particleSystem = new THREE.ParticleSystem(particles[a], pMaterial);
		particleSystems.push(particleSystem);
		scene.addChild(particleSystem);
	}
}

function update ()
{
	requestAnimationFrame(update);
	render();
	stats.update();
}

function render ()
{
	for(var i = 0; i<psC; i++)
	{
		var c = pc;
		
		while(c--){
			var particle = particles[i].vertices[c];
			
			if(particle.position.y > 0) {
				particle.position.y = -250;
				particle.velocity = new THREE.Vector3(0, Math.random() * 2, 0);
			}
			    
			particle.velocity.y += Math.random() * .1;
//			particle.materials[0].
			particle.position.addSelf(particle.velocity);
		}
		
		particleSystems[i].geometry.__dirtyVertices = true;
	}
	
//	camera.position.x += ( mouseX - camera.position.x ) * .05;
//	camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
//	camera.updateMatrix();

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

function setup ()
{
	// set some camera attributes
	var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

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
	renderer.setClearColor(0x000000);

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