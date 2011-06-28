/**
 * 
 */

if (!Detector.webgl) Detector.addGetWebGLMessage();
if (!Detector.audioAPI) Detector.addGetAudioMessage();

var types = {
	PARTICLES : "particles",
	LINES : "lines"
}

var context, 
	stage, 
	source, 
	inputArrayL,
	sizeArray = 300,
	analyser;

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

	particles,
	particleSystem,
	
	renderColor = 0x000000,
	
	CAMERA_POS = 800,
	VIEW_ANGLE = 0, 
	ASPECT = WIDTH / HEIGHT, 
	NEAR = 0.1, 
	FAR = 5000;
	
var guiParams = {
	type : types.PARTICLES,
	music: "test.ogg"
};

function setup ()
{
	// set Stage
	stage = new Stage();
	
	// create container
	container = new Sprite('div');
	stage.addChild(container);

	// stats
	stats = new Stats();
	stats.domElement.id = "stats";
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.addChild(stats);
	
	// Audio Context
	context = new webkitAudioContext();
    source = context.createBufferSource();

    // This AudioNode will do the amplitude modulation effect directly in JavaScript
    jsProcessor = context.createJavaScriptNode(sizeArray);
    jsProcessor.onaudioprocess = process;

    analyser = context.createAnalyser();
    analyser.fftSize = sizeArray / 2;

    // Connect the processing graph: source -> jsProcessor -> analyser -> destination
    source.connect(jsProcessor);
    jsProcessor.connect(analyser);
    analyser.connect(context.destination);

	// renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		clearAlpha: 1,
		sortObjects: true,
		sortElements: true
	});
	
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(renderColor);
	
	// camera
	camera = new THREE.Camera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.z = CAMERA_POS;

	// scene
	scene = new THREE.Scene();

	// add renderer to stage
	container.addChild(renderer);
		
	// load music
	load(guiParams.music);

	// add document listeners
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onDocumentResize, false);
	
	// add gui
	gui();
	
	// update
	update();
}

function gui()
{
	// GUI
//	DAT.GUI.autoPlace = 0;
	
	var gui = new DAT.GUI();
	gui.add(guiParams, 'type')
		.options({'Particles': types.PARTICLES, 'Lines': types.LINES})
		.onChange(function(newValue) {
	  		draw();
		}
	);
	
	gui.add(guiParams, 'music')
		.options({'Foo Fighters - Rope': "test.ogg", 'Techno/Trance': "test.oga"})
		.onChange(function(newValue) {
	  		load(newValue);
		}
	);
	
//	gui.domElement.style.position = "fixed";
//	gui.domElement.style.top = "50px";
//	gui.domElement.style.width = "240px";
//	gui.domElement.style.height = "125px";
//	gui.domElement.style.overflow = "hidden";
//	document.body.appendChild(gui.domElement);
}

// Process audio data
function process(event) 
{
    // Get left/right input and output arrays
    inputArrayL = event.inputBuffer.getChannelData(0);
    //var inputArrayR = event.inputBuffer.getChannelData(1);
    var outputArrayL = event.outputBuffer.getChannelData(0);
    var outputArrayR = event.outputBuffer.getChannelData(1);
    
    var n = inputArrayL.length;
 
    for (var i = 0; i < n; ++i) {
        outputArrayL[i] = inputArrayL[i];
      	outputArrayR[i] = outputArrayL[i];
    }

	
	updateSpectrum();

}

// load
function load(url) 
{
	loading = new Sprite('loading');
	loading.position('fixed');
	loading.dom.style.bottom = "40px";
	loading.dom.style.left = "32px";
	stage.addChild(loading);
	
	var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function()
	{
		source.buffer = context.createBuffer(request.response, false);
		source.noteOn(0);
		draw();
		stage.removeChild(loading);
	};
	
	request.onprogress = function(e)
	{
		var currentpercent = Math.round((e.position/e.totalSize) * 100);
		loading.html("<p>Loading tune: "+ currentpercent + "%</p>");
	};
	
    request.send();
}

function updateSpectrum()
{

	for(var i = 0; i<sizeArray; i++)
	{
		switch(guiParams.type)
		{
			case types.PARTICLES:
				new TWEEN.Tween(geometry.vertices[i].position).to({y: inputArrayL[i] * HEIGHT / 10}, 50).start();
				break;
				
			case types.LINES:
				new TWEEN.Tween(lines[i].scale).to({x: inputArrayL[i], y: inputArrayL[i]}, 50).start();
				break;
		}
		
	}
}

function clean()
{
	scene = new THREE.Scene();
	scene.update();
}

// Draw
function draw()
{
	clean();
	
	var radius = 3;
	geometry =  new THREE.Geometry();
	pMaterial = new THREE.ParticleBasicMaterial({ color: 0xFFFFFF * Math.random(), size: radius });
	
	lines = [];
	
	for(var i = 0; i<sizeArray; i++)
	{
		
		switch(guiParams.type)
		{
			case types.PARTICLES:
				particle = new THREE.Vertex(new THREE.Vector3(radius * i - WIDTH / 2, 0, 0));
				geometry.vertices.push(particle);
				break;
				
			case types.LINES:
				
				var g =  new THREE.Geometry();
				
				var vector = new THREE.Vector3( 0,0,0);
				g.vertices.push( new THREE.Vertex( vector ) );

				var vector2 = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
				vector2.multiplyScalar( 250 );

				g.vertices.push( new THREE.Vertex( vector2 ) );

				var line = new THREE.Line( g, new THREE.LineBasicMaterial( { color: 0xffffff * Math.random(), opacity: Math.random() } ) );
				lines.push(line);
				scene.addObject( line );
				break;
		}		
	}
	
	if(guiParams.type == types.PARTICLES){
		particleSystem = new THREE.ParticleSystem(geometry, pMaterial);
		particleSystem.sortParticles = true;
		scene.addChild(particleSystem);
	}
}

// Update
function update()
{
	if(particleSystem) particleSystem.geometry.__dirtyVertices = true;
	render();
	TWEEN.update();
	stats.update();
	requestAnimationFrame(update);
}

function render ()
{
	//camera.position.x += ( mouseX - camera.position.x ) * .05;
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

// INIT !!!!! 
setup();