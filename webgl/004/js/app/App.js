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
	
	renderColor = 0x000000,
	
	pS = [],
	totalParticles = 0,
	tP,
	
	CAMERA_POS = 300,
	VIEW_ANGLE = 45, 
	ASPECT = WIDTH / HEIGHT, 
	NEAR = 0.1, 
	FAR = 10000;

var PROPS = {
	size : 1,
	amount : 1000,
	rotate : false,
	explode : function()
	{
		createParticleEmiter(0,0);
	}
};

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

	// add document listeners
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onDocumentResize, false);
	window.addEventListener('click', onDocumentClick, false);
	
	// GUI
	DAT.GUI.autoPlace = 0;
	
	var gui = new DAT.GUI();
	gui.add(PROPS, 'size').min(1).max(10);
	gui.add(PROPS, 'amount').min(1).max(10000).step(10);
	gui.add(PROPS, 'rotate');
	gui.add(PROPS, 'explode').name('Explode!');
	gui.domElement.style.position = "fixed";
	gui.domElement.style.top = "50px";
	gui.domElement.style.width = "240px";
	gui.domElement.style.height = "125px";
	gui.domElement.style.overflow = "hidden";
	document.body.appendChild(gui.domElement);
	
	// total particles
	tP = document.createElement('div');
	tP.id = "totalParticles";
	tP.innerHTML = "Running " +  totalParticles + " particles with WebGLRenderer";
	document.body.appendChild(tP);

	// update
	update();
}

function createParticleEmiter(x, y)
{
	var particleHolder = new THREE.Geometry();
	
	totalParticles += PROPS.amount;
	
	for(var i = 0; i<PROPS.amount; i++)
	{
		pMaterial = new THREE.ParticleBasicMaterial({ size: PROPS.size, color: Math.random() * 0xFFFFFF	});
		var particle = new THREE.Particle(pMaterial);
		particleHolder.vertices.push(particle);
		initParticle(particle, i);
	}
	
	var particleSystem = new THREE.ParticleSystem(particleHolder, pMaterial);
	pS.push(particleSystem);
	scene.addChild(particleSystem);
}

function initParticle( p, d ) 
{
	var particle = p;
	var delay = d !== undefined ? d : 0;
	
	new TWEEN.Tween( particle.position )
		.delay( delay )
		.to( { x: Math.random() * WIDTH - WIDTH / 2, y: Math.random() * HEIGHT - HEIGHT / 2, z: Math.random() * WIDTH - WIDTH / 2 + 1000}, 10000 )
		.start();
}

function update ()
{
	requestAnimationFrame(update);
	render();
	stats.update();
}

function render ()
{
	for(var a = 0; a<pS.length; a++) {
		if(PROPS.rotate) pS[a].rotation.y += ( mouseX - pS[a].rotation.y ) * 0.00001;
		pS[a].geometry.__dirtyVertices = true;
	}
	
	TWEEN.update();
	tP.innerHTML = "Running " +  totalParticles + " particles with WebGLRenderer";
	renderer.render(scene, camera);
}

// HANDLERS

function onDocumentClick(event)
{
	createParticleEmiter(mouseX, mouseY * -1);
}

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