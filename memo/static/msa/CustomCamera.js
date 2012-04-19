/*
Online remote gestural interaction prototype by Memo Akten, www.memo.tv

On-site interactive installation tracks people moving in the space and broadcasts their motion onto the web, their movements visualised in realtime in web browsers around the world. Web viewers can watch, or further interact with the generative graphics.

Designed and developed during a 5-day residency at ScreenLab MediaCityUK 0x01, University of Salford, MediaCityUK

With support from Kit Turner, Elliot Woods, James George
Additional support from Alasdair Swenson, Sunjoy Prabakaran
Special thanks to Chris Allick and Seb Lee-Delisle.
Made with webgl and three.js by Ricardo Cabello aka MrDoob
*/



msa.CustomCamera = function(fov, aspect, near, far) {
	THREE.PerspectiveCamera.call(this, fov, aspect, near, far );
}

msa.CustomCamera.prototype = new THREE.PerspectiveCamera;
msa.CustomCamera.prototype.constructor = msa.CustomCamera;


//-------------------------------------
msa.CustomCamera.prototype.updateProjectionMatrix = function () {
	
	if(this.forceProjectionMatrix) {
		this.projectionMatrix = this.forceProjectionMatrix.clone();
/* 		console.log("forceProjectionMatrix", this.projectionMatrix); */
	} else 
	if ( this.fullWidth ) {

		var aspect = this.fullWidth / this.fullHeight;
		var top = Math.tan( this.fov * Math.PI / 360 ) * this.near;
		var bottom = -top;
		
		var left = aspect * bottom;
		var right = aspect * top;
		var width = Math.abs( right - left );
		var height = Math.abs( top - bottom );

		this.projectionMatrix = THREE.Matrix4.makeFrustum(
			left + this.x * width / this.fullWidth,
			left + ( this.x + this.width ) * width / this.fullWidth,
			top - ( this.y + this.height ) * height / this.fullHeight,
			top - this.y * height / this.fullHeight,
			this.near,
			this.far );

	} else {
		this.projectionMatrix = THREE.Matrix4.makePerspective( this.fov, this.aspect, this.near, this.far );
	}
}
	
	
//-------------------------------------
msa.CustomCamera.prototype.updateMatrixWorld = function ( force ) {
	if(this.forceViewMatrix) {
		this.matrixWorld.getInverse(this.forceViewMatrix);

	} else {
	
		this.matrixAutoUpdate && this.updateMatrix();
		// update matrixWorld
		if ( this.matrixWorldNeedsUpdate || force ) {
			if ( this.parent ) {
				this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );
			} else {
				this.matrixWorld.copy( this.matrix );
			}
	
			this.matrixWorldNeedsUpdate = false;
			force = true;
		}

		// update children
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[ i ].updateMatrixWorld( force );
		}

	}
}