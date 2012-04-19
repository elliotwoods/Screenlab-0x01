/*
Online remote gestural interaction prototype by Memo Akten, www.memo.tv

On-site interactive installation tracks people moving in the space and broadcasts their motion onto the web, their movements visualised in realtime in web browsers around the world. Web viewers can watch, or further interact with the generative graphics.

Designed and developed during a 5-day residency at ScreenLab MediaCityUK 0x01, University of Salford, MediaCityUK

With support from Kit Turner, Elliot Woods, James George
Additional support from Alasdair Swenson, Sunjoy Prabakaran
Special thanks to Chris Allick and Seb Lee-Delisle.
Made with webgl and three.js by Ricardo Cabello aka MrDoob
*/


//-------------------------------------
if(!Detector.webgl) Detector.addGetWebGLMessage();
//-------------------------------------

console.log("STARTING...");

var UNITS = 1;



// TODO: update this with ip address of webserver
// TODO: how to make this automatic?
// var websocketAddr = "ws://146.87.190.37:80/websocket";  // CPU7
var websocketAddr = "ws://146.87.190.31:80/websocket";  // AV-MAIN 4K

/* var websocketAddr = "ws://127.0.0.1:80/websocket"; */

// params
var params = {
	camera: {
		FOV: 30,
		FarClip: 8 * UNITS,
		ZPos: 3 * UNITS,
        YPos: 0.0 * UNITS,
        lookAtHeight: 0.1 * UNITS,
		headTracking: false,    // read from GET
        mouseTracking:true,  
		headTrackMult: 2,
		headTrackMax: 1,
/* 		updateMatrices: false, */
	},

	fog: {
		start: 0,
		end: 3 * UNITS,
	},
	
	particleSystem: {
		maxParticleCount: 1000, // read from GET
		maxEmitCount: 6,
		minSpeedThresh:0.005 * UNITS,
		maxSpeedThresh: 0.1 * UNITS,
		mouseVelMult: 0.2,
	},
	
	rendering: {
		enableShadows: true,
		enableSoftShadows: false,
		shadowMapWidth: 1024,
		shadowMapHeight: 1024,
		shadowDarkness: 0.8,
	},
	
	color: {
		changeTime: 8,
		fadeTime: 1,
	},
	
	light: {
		ZPos: 9 * UNITS,
	},
	
	doMouseDraw:false,
}


msa.Particle.params = {
	drag: 0.97,
	homeForce: 0,
	minMass: 0.1,
	life: 4,
		
	gravity: -0.02 * UNITS,
	gravityStartTime: 2.5,
	gravityEndTime: 6,
		
	noisePosAmount: 0.0005 * UNITS,
	noiseRotAmount: 0.002,
	noiseTimeScale: 0.3,
	noisePosScale: 2 / UNITS,
	noiseStartTime: 1,
	noiseEndTime: 3,
	noiseOmitFrames: 5,	// optimization to only apply noise on every n frames
}

msa.MessageHandler.params = {
	coordinateScaler: 1 * UNITS,
	zOffset:2 * UNITS,
}

msa.Skeleton.params = {
	jointRadius: 0.025 * UNITS,
	boneWidth: 0.006 * UNITS,
    jointSmoothing: 0.5,
    idleKillTime: 1,    // kill after this many seconds of not receiving an update
}

// vars
var debugMode = false;
var camera, scene, renderer, root;

var particleManager;
var skeletons = [];

var mousePos	= new THREE.Vector3(0, 0, 0); // current mouse position
var mouseDown   = [];
var pmousePos	= new THREE.Vector3(0, 0, 0); // previous mouse position

var headLight;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var colorManager		= new msa.ColorManager();
var messageHandler		= new msa.MessageHandler();
var noise				= new SimplexNoise();

// need separate clocks, because getDelta doesn't work properly if you getElapsed
var masterClock			= new THREE.Clock(true);
var colorClock			= new THREE.Clock(true);
var noiseClock			= new THREE.Clock(true);
var lastColorChangeTime = 0;

var targetBGColor		= new THREE.Color(0xFFFFFF);
var lastBGColor			= new THREE.Color(0xFFFFFF);
var currentBGColor		= new THREE.Color(0xFFFFFF);		// lerps to target background color

var mouseGenerateMode	= true;

var screenIndex;

var rootTargetRotation	= new THREE.Vector2(0, 0);
//var keyboard = new THREEx.KeyboardState();


initThree();
draw();


//-------------------------------------
function chooseRandomColorPalette() {
	colorManager.getRandomPalette();
	particleManager.randomizeColors(colorManager.getCurrentPalette());

	lastBGColor.copy(currentBGColor);
	targetBGColor.copy(colorManager.getRandomBGColor());

	lastColorChangeTime = colorClock.getElapsedTime();

	console.log("chooseRandomColorPalette", colorManager.getCurrentPalette(), targetBGColor.getHex().toString(16));
}

//-------------------------------------
function initThree() {
	console.log("initThree");

    	
	// get parameters
	screenIndex = getParameterByName("screen");
	console.log("screenIndex", screenIndex);
	
	params.camera.headTracking = getParameterByName("headTracking");
   // params.camera.mouseTracking = getParameterByName("mouseTracking");
    var maxParticleCount = getParameterByName("maxParticleCount");
    if(maxParticleCount > 0) params.particleSystem.maxParticleCount = maxParticleCount;
	
	// create scene
	scene = new THREE.Scene();
	
	// create root
	root = new THREE.Object3D();
	scene.add(root);
	
	// create and add renderer
	renderer = new THREE.WebGLRenderer( { alpha: false } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = true;
	renderer.setClearColor(new THREE.Color(THREE.Math.randInt(0, 0xFFFFFF)), 1 );	
	renderer.shadowMapEnabled = params.rendering.enableShadows;
	renderer.shadowMapSoft = params.rendering.enableSoftShadows;	
	document.body.appendChild( renderer.domElement );


	// create and add camera
/* 	camera = new msa.CustomCamera(params.camera.FOV, window.innerWidth/window.innerHeight, 1, params.camera.FarClip); */
	camera = new THREE.PerspectiveCamera(params.camera.FOV, window.innerWidth/window.innerHeight, 1, params.camera.FarClip);
	camera.position.set(0, params.camera.YPos, params.camera.ZPos);
    camera.lookAt(new THREE.Vector3(0, params.camera.lookAtHeight, 0));
	
	// create scene and add camera
/*  	scene.fog = new THREE.Fog(renderer.clearColor, params.fog.start, params.fog.end ); */
	scene.add(camera);


	// add light	
	headLight = new THREE.SpotLight(0xFFFFFF);
	headLight.castShadow = true;
	headLight.shadowCameraNear = 0.000000000000 * UNITS;
	headLight.shadowCameraFar = params.light.ZPos;
	headLight.shadowCameraFov = params.camera.FOV;
	headLight.shadowBias = 0;
	headLight.shadowDarkness = params.rendering.shadowDarkness;
	headLight.shadowMapWidth = params.rendering.shadowMapWidth;
	headLight.shadowMapHeight = params.rendering.shadowMapHeight;
	headLight.position.set(0, 0, params.light.ZPos);//camera.position.clone();
	scene.add(headLight);
	
	
	// create and add particle manager
	particleManager = new msa.ParticleManager(params.particleSystem.maxParticleCount);
	root.add(particleManager);
	
	// misc init stuff
 	THREEx.WindowResize(renderer, camera);
	msaStatsSetup(document.body);
	chooseRandomColorPalette();
/* 	particleManager.addScene(scene); */
	
		// register events
	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mouseup', onMouseUp, false);
/* 	document.addEventListener('click', onClick, false); */
/*
	document.addEventListener('touchstart', onTouchStart, false);
	document.addEventListener('touchmove', onTouchMove, false);
*/
/* 	document.addEventListener('touchend', onTouchEnd, false );	 */
	
	document.addEventListener( 'keydown', onKeyDown, false);

	messageHandler.init();

    sendHeartbeat();


/*
    // javascript array tests (wtf)
    var tt = [];
    console.log("tt[5]", tt[5]);
    console.log("tt[9]", tt[9]);
    tt[5] = "number5"
    tt[2] = "number2"
    console.log("tt.length", tt.length);
    for(var i=0; i<tt.length; i++) {
        if(tt[i] == undefined) console.log(i, "it is undefined");
        else console.log(i, tt[i]);
    }
    console.log("tt[9]", tt[9]);
    */
}

function sendHeartbeat() {
    console.log("sendHeartbeat");
    var xmlHttp;
    try {
    	xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET", "http://localhost:81", true);
	    xmlHttp.onreadystatechange = function() {
	    }
	    xmlHttp.send(' ');
    } 
    catch(e)
    {
    }
    setTimeout("sendHeartbeat()", 1000 * 5);
}


//-------------------------------------
function createSkeleton(i) {
    skeletons[i] = new msa.Skeleton(i);
    root.add(skeletons[i]);
    console.log("Creating skeleton", i);;
}

//-------------------------------------
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


//-------------------------------------
function onMouseMove(event) {
	if(debugMode) console.log("onDocumentMouseMove", event);
	pmousePos.copy(mousePos);
	var n = noise.noise(noiseClock.getElapsedTime()*0.5, 0);
	mousePos.set((event.clientX - windowHalfX)/windowHalfX * UNITS, -(event.clientY - windowHalfY)/windowHalfY * UNITS, n * 1 * UNITS);

	if(mouseGenerateMode && mouseDown[0]) {
		var mouseVel = mousePos.clone().subSelf(pmousePos);
	 	var mouseSpeed = mouseVel.length();
	 	var particleVel = mouseVel.clone().multiplyScalar(params.particleSystem.mouseVelMult);
	 	var particleCount = Math.min(params.particleSystem.maxEmitCount, THREE.Math.mapLinear(mouseSpeed, 0, params.particleSystem.maxSpeedThresh, 1, params.particleSystem.maxEmitCount));

		particleManager.addRandomParticle(mousePos, particleVel, particleCount, mouseSpeed*0.3);
	}
}


//-------------------------------------
function onMouseDown(event) {
    mouseDown[event.button] = mousePos.clone();
}


//-------------------------------------
function onMouseUp(event) {
    mouseDown[event.button] = 0;
}

/*
//-------------------------------------
function onClick(event) {

}
*/


//-------------------------------------
/*
function onTouchStart(event) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;

	}
}
*/


//-------------------------------------
/*
function onTouchMove(event) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}
*/


//-------------------------------------f
function onKeyDown(event) {
	console.log("onKeyDown", event);

	switch(event.keyCode) {
	
		case 32:
			console.log("scene: ", scene);
	        break;

		case 67:    // c
			chooseRandomColorPalette();
/* 			params.camera.updateMatrices = !params.camera.updateMatrices; */
	        break;

		case 68:	// d
	        debugMode = !debugMode;
	        break;
	        
	    case 77:	// m
	    	mouseGenerateMode = !mouseGenerateMode;
	    	break;
	    	
	    case 84: 	// t
	    	params.camera.mouseTracking = !params.camera.mouseTracking;
		        

	}
}


//-------------------------------------
function draw() {
	requestAnimationFrame( draw );
	var deltaTime = masterClock.getDelta();
	
	
	// fade background, or change color palette
	var colorChangeElapsed = colorClock.getElapsedTime() - lastColorChangeTime;
	var colorFadePerc = THREE.Math.mapLinear(colorChangeElapsed, 0, params.color.fadeTime, 0, 1);
	if(colorChangeElapsed < params.color.fadeTime) {
		currentBGColor.r = THREE.Math.mapLinear(colorFadePerc, 0, 1, lastBGColor.r, targetBGColor.r);
		currentBGColor.g = THREE.Math.mapLinear(colorFadePerc, 0, 1, lastBGColor.g, targetBGColor.g);
		currentBGColor.b = THREE.Math.mapLinear(colorFadePerc, 0, 1, lastBGColor.b, targetBGColor.b);
		renderer.setClearColor(currentBGColor);	
		
		particleManager.fadeColors(colorFadePerc);

	} else if(colorChangeElapsed > params.color.changeTime) {
		chooseRandomColorPalette();
	}
	
/*  	mouseVel = mousePos.clone().subSelf(pmousePos).multiplyScalar(params.particleSystem.mouseVelMult); */
 	
    for(var si=0; si<skeletons.length; si++) {
        var skeleton = skeletons[si];
        if(skeleton != undefined && skeleton.visible) {
 	        for(var i=0; i<skeleton.getNumJoints(); i++) {
 		        var j = skeleton.joints[i];
 		        if(j.emitThreshold > 0) {
		 	        var vel = skeleton.getJointVelocity(i).clone().multiplyScalar(params.particleSystem.mouseVelMult);
		 	        var speed = THREE.Math.clamp(vel.length(), 0, params.particleSystem.maxSpeedThresh);
		 	        if(speed > params.particleSystem.minSpeedThresh * skeleton.joints[i].emitThreshold) {
			 	        var particleCount = Math.min(params.particleSystem.maxEmitCount, THREE.Math.mapLinear(speed, params.particleSystem.minSpeedThresh, params.particleSystem.maxSpeedThresh, 1, params.particleSystem.maxEmitCount));
				        particleManager.addRandomParticle(skeleton.getJointPosition(i), vel, particleCount, speed);
	 		        }
	 	        }
            }
           	skeleton.update(deltaTime);
        }
	}

	particleManager.updatePhysics(deltaTime);

    if(params.camera.mouseTracking && mouseDown[0]) {
	    rootTargetRotation.y = mousePos.x / UNITS;
	    rootTargetRotation.x = -mousePos.y / UNITS;
	} else {
        rootTargetRotation.set(0, 0);
    }
	
	if(params.camera.headTracking) {
//		rootTargetRotation.y = -skeleton.centerPos.x * params.camera.headTrackMult;
    }


	rootTargetRotation.y = THREE.Math.clamp(rootTargetRotation.y, -params.camera.headTrackMax, params.camera.headTrackMax);

	root.rotation.x += (rootTargetRotation.x - root.rotation.x) * 0.05;
	root.rotation.y += (rootTargetRotation.y - root.rotation.y) * 0.05;

	
	renderer.render(scene, camera);
	
	msaStatsUpdate();
	
/*  	pmousePos.copy(mousePos); */
}
