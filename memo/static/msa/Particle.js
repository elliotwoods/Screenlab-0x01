/*
Online remote gestural interaction prototype by Memo Akten, www.memo.tv

On-site interactive installation tracks people moving in the space and broadcasts their motion onto the web, their movements visualised in realtime in web browsers around the world. Web viewers can watch, or further interact with the generative graphics.

Designed and developed during a 5-day residency at ScreenLab MediaCityUK 0x01, University of Salford, MediaCityUK

With support from Kit Turner, Elliot Woods, James George
Additional support from Alasdair Swenson, Sunjoy Prabakaran
Special thanks to Chris Allick and Seb Lee-Delisle.
Made with webgl and three.js by Ricardo Cabello aka MrDoob
*/




msa.Particle = function(geometry, material) {
//	if(debugMode) console.log("msa.Particle", geometry, material)
	
	// super constructor
	THREE.Mesh.call( this, geometry, material );

	this.position = new THREE.Vector3(0, 0, 0);
	this.rotation = new THREE.Vector3(0, 0, 0);
	this.scale = new THREE.Vector3(0, 0, 0);
	
	this.homePos = new THREE.Vector3(0, 0, 0);
	this.startScale = new THREE.Vector3(0, 0, 0);
	this.posVelocity = new THREE.Vector3(0, 0, 0);
	this.rotVelocity = new THREE.Vector3(0, 0, 0);
	
/* 	this.init(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)); */

	this.killme();
};

msa.Particle.prototype = new THREE.Mesh;
msa.Particle.prototype.constructor = msa.Particle;

	
//-------------------------------------
msa.Particle.prototype.init = function(position, rotation, scale, velocity) {
//	if(debugMode) console.log("msa.Particle.init", position, rotation, scale, velocity)
	this.position.copy(position);
	
	this.rotation.copy(rotation);
	this.scale.copy(scale)

	this.homePos.copy(position);
	this.startScale.copy(scale);
	this.posVelocity.copy(velocity);
	this.rotVelocity.set(0, 0, 0);

	this.drag = msa.Particle.params.drag;
	this.clock = new THREE.Clock(true);
	this.mass = THREE.Math.randFloat(msa.Particle.params.minMass, 1);
	this.frameCount = 0;
	
	this.castShadow = true;
	this.receiveShadow = true;
	this.visible = true;
}

//-------------------------------------
msa.Particle.prototype.updatePhysics = function(deltaTime) {
	if(this.visible == false) return;
	
	var age = this.clock.getElapsedTime();
	var deltaTimeMult = 60 * deltaTime; //this isn't working very well

	// update position and rotation based on velocity
	this.position.addSelf(this.posVelocity.clone().multiplyScalar(this.mass * deltaTimeMult));
	this.rotation.addSelf(this.rotVelocity.clone().multiplyScalar(this.mass * deltaTimeMult));
	
	// apply drag to velocity
	this.posVelocity.multiplyScalar(this.drag);
	this.rotVelocity.multiplyScalar(this.drag);
	
	// add home spring force
	if(msa.Particle.params.homeForce>0) this.posVelocity.addSelf(this.homePos.clone().subSelf(this.position).multiplyScalar(msa.Particle.params.homeForce)); 
		
	// add noise
	if(age > msa.Particle.params.noiseStartTime && this.frameCount % msa.Particle.params.noiseOmitFrames == 0) {
 		var t = age*msa.Particle.params.noiseTimeScale;
 		var spos = this.position.clone().multiplyScalar(msa.Particle.params.noisePosScale);

 		var r = THREE.Math.clamp(THREE.Math.mapLinear(age, msa.Particle.params.noiseStartTime, msa.Particle.params.noiseEndTime, 0, 1), 0, 1);	// normalized age ratio
/*  		r = r * r;	// ease in; */

			var noisePosAmount = r * msa.Particle.params.noisePosAmount * deltaTimeMult * msa.Particle.params.noiseOmitFrames;
 		this.posVelocity.x += noisePosAmount * noise.noise3d(t + spos.x, spos.y, spos.z + 4514.12141);
 		this.posVelocity.y += noisePosAmount * noise.noise3d(t + spos.x, spos.y, spos.z + 7152.4123);
 		this.posVelocity.z += noisePosAmount * noise.noise3d(t + spos.x, spos.y, spos.z + 8162.4487);
 		
		var noiseRotAmount = r * msa.Particle.params.noiseRotAmount * deltaTimeMult * msa.Particle.params.noiseOmitFrames;
 		this.rotVelocity.x += noiseRotAmount * noise.noise3d(t + spos.x, spos.y, spos.z + 4123.3552);
 		this.rotVelocity.y += noiseRotAmount * noise.noise3d(t + spos.x, spos.y, spos.z + 1763.4231);
 		this.rotVelocity.z += noiseRotAmount * noise.noise3d(t + spos.x, spos.y, spos.z + 7624.1112);
 	}

		
	// if too old, gravity away
	if(age > msa.Particle.params.gravityStartTime) {
		var r = THREE.Math.clamp(THREE.Math.mapLinear(age, msa.Particle.params.gravityStartTime, msa.Particle.params.gravityEndTime, 0, 1), 0, 1);	// normalized age ratio
		r = r * r * r;	// ease in;
		var gravity = r * msa.Particle.params.gravity * deltaTimeMult;
		this.posVelocity.y -= gravity;
	}
		
	// scale	
	if(msa.Particle.params.life>0) {
 		var s = THREE.Math.mapLinear(age, 0, msa.Particle.params.life, 0, 1);
 		s = s * s * s * s;
 		s = 1 - s;
 		this.scale = this.startScale.clone().multiplyScalar(s);
	}
		
	if(this.position.y > window.innerHeight * 2 * UNITS/1000 || this.position.y < -window.innerHeight * 2 * UNITS/1000 || age > msa.Particle.params.life) 
		this.killme();

	this.frameCount ++;
}
	
	
//-------------------------------------
msa.Particle.prototype.killme = function() {
/* 	if(debugMode) console.log("msa.Particle.killme"); */
	
	this.visible = false;
}
