/*
Online remote gestural interaction prototype by Memo Akten, www.memo.tv

On-site interactive installation tracks people moving in the space and broadcasts their motion onto the web, their movements visualised in realtime in web browsers around the world. Web viewers can watch, or further interact with the generative graphics.

Designed and developed during a 5-day residency at ScreenLab MediaCityUK 0x01, University of Salford, MediaCityUK

With support from Kit Turner, Elliot Woods, James George
Additional support from Alasdair Swenson, Sunjoy Prabakaran
Special thanks to Chris Allick and Seb Lee-Delisle.
Made with webgl and three.js by Ricardo Cabello aka MrDoob
*/


msa.ParticleManager = function(maxObjectCount) {
	console.log("msa.ParticleManager");

	// create shapes and geometries
	var size = 0.01 * UNITS;	// TODO: make this very big for fuckup goodness
	this.shapes = [
/* 		{ uniformScale:true, minScale: 2, maxScale: 5, smooth: true, geom: new THREE.SphereGeometry(size/2 ) }, */
		{ uniformScale:true, minScale: 2, maxScale: 5, smooth: false, geom: new THREE.IcosahedronGeometry(size/2 ) },
		{ uniformScale:true, minScale: 2, maxScale: 5, smooth: false, geom: new THREE.OctahedronGeometry(size/2 ) },
		{ uniformScale:true, minScale: 2, maxScale: 5, smooth: false, geom: new THREE.TetrahedronGeometry(size/2 ) },
		{ uniformScale:false, minScale: 1, maxScale: 7, smooth: false, geom: new THREE.CubeGeometry(size, size, size ) },
		{ uniformScale:false, minScale: 1, maxScale: 7, smooth: false, geom: new THREE.CylinderGeometry(size/5, size/5, size*4, 5, 1) },
		{ uniformScale:false, minScale: 1, maxScale: 7, smooth: false, geom: new THREE.PlaneGeometry(size, size) },
	];
/* 	shapes.push(new THREE.TorusGeometry( ) ); */
	
	
	// create materials
	this.mats = [];
	for(var i=0; i<16; i++) {
/* 		var color = THREE.Math.randInt(0, 0xFFFFFF); */
		var specular = new THREE.Color(0xFFFFFF).setHSV(0, 0, THREE.Math.randFloat(0, 1)).getHex();
		var shininess = THREE.Math.randFloat(0, 100);
		this.mats.push( { 
			smooth: new THREE.MeshPhongMaterial( { color: 0xFFFFFF, specular: specular, shininess: shininess, shading:THREE.SmoothShading} ),
			flat : new THREE.MeshPhongMaterial( { color: 0xFFFFFF, specular: specular, shininess: shininess, shading:THREE.FlatShading} ),
			lastColor: new THREE.Color(0xFFFFFF),
			targetColor: new THREE.Color(0xFFFFFF)
		});
	}
	
	
	// create random particles
	for(var i=0; i<maxObjectCount; i++) {
		var shapeIndex = THREE.Math.randInt(0, this.shapes.length-1);
		var matIndex = THREE.Math.randInt(0, this.mats.length-1);
		var mat = this.shapes[shapeIndex].smooth ? this.mats[matIndex].smooth : this.mats[matIndex].flat;

		var p = new msa.Particle(this.shapes[shapeIndex].geom, mat ) ;
		p.shapeIndex = shapeIndex;
		
		this.add( p );
//		console.log("adding particle", p);
	}
	this.nextObjectIndex = 0;	// use this to know where to init the next particle
};


msa.ParticleManager.prototype = new THREE.Object3D;
msa.ParticleManager.prototype.constructor = msa.ParticleManager;


//-------------------------------------
msa.ParticleManager.prototype.randomizeColors = function(paletteIndex) {
/* 		console.log("msa.ParticleManager.randomizeColor", paletteIndex); */
	for(var i=0; i<this.mats.length; i++) {
		this.mats[i].lastColor.copy(this.mats[i].smooth.color);
		this.mats[i].targetColor.copy(colorManager.getRandomColor(paletteIndex));
	}
}


//-------------------------------------
msa.ParticleManager.prototype.fadeColors = function(colorFadePerc) {
	for(var i=0; i<this.mats.length; i++) {
		var color = new THREE.Color();
		color.r = THREE.Math.mapLinear(colorFadePerc, 0, 1, this.mats[i].lastColor.r, this.mats[i].targetColor.r);
		color.g = THREE.Math.mapLinear(colorFadePerc, 0, 1, this.mats[i].lastColor.g, this.mats[i].targetColor.g);
		color.b = THREE.Math.mapLinear(colorFadePerc, 0, 1, this.mats[i].lastColor.b, this.mats[i].targetColor.b);

		this.mats[i].smooth.color.copy(color);
		this.mats[i].flat.color.copy(color);

	}
}


//-------------------------------------
msa.ParticleManager.prototype.addParticle = function(position, rotation, scale, velocity) {
//	if(debugMode) console.log("msa.ParticleManager.addParticle", position, rotation, scale, velocity);
	
	this.children[this.nextObjectIndex].init(position, rotation, scale, velocity);
	this.nextObjectIndex++;
	if(this.nextObjectIndex >= this.children.length) this.nextObjectIndex = 0;
}


//-------------------------------------
msa.ParticleManager.prototype.addRandomParticle = function(position, velocity, count, spreadDistance) {
//	if(debugMode) console.log("msa.ParticleManager.addRandom", position, velocity, count, spreadDistance);

	for(var i=0; i<count; i++) {
/* 		var shapeIndex = THREE.Math.randInt(0, this.shapes.length-1); */
/* 		var matIndex = THREE.Math.randInt(0, this.mats.length-1); */

	 	var pos = position.clone();
	 	pos.x += THREE.Math.randFloatSpread(spreadDistance);
	 	pos.y += THREE.Math.randFloatSpread(spreadDistance);
	 	pos.z += THREE.Math.randFloatSpread(spreadDistance);

		var shapeIndex = this.children[this.nextObjectIndex].shapeIndex;
		var scale;
		var minScale = this.shapes[shapeIndex].minScale;
		var maxScale = this.shapes[shapeIndex].maxScale;
		if(this.shapes[shapeIndex].uniformScale) {
			var s = THREE.Math.randFloat(minScale, maxScale);
			scale = new THREE.Vector3(s, s, s);
		} else {
			scale = new THREE.Vector3(THREE.Math.randFloat(minScale, maxScale), THREE.Math.randFloat(minScale, maxScale), THREE.Math.randFloat(minScale, maxScale));
		}

		this.addParticle(
			pos, 
			new THREE.Vector3(THREE.Math.randFloatSpread(360), THREE.Math.randFloatSpread(360), THREE.Math.randFloatSpread(360)),
			scale,
			velocity);
	}
}


//-------------------------------------
msa.ParticleManager.prototype.updatePhysics = function(deltaTime) {
/*
	for(var i=0; i < this.particles.children.length; i ++ ) {
		this.particles.children[i].physicsUpdate(deltaTime);
*/
	for(var i=0; i < this.children.length; i ++ ) {
		this.children[i].updatePhysics(deltaTime);
	}
	
}
