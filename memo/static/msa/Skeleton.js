/*
Online remote gestural interaction prototype by Memo Akten, www.memo.tv

On-site interactive installation tracks people moving in the space and broadcasts their motion onto the web, their movements visualised in realtime in web browsers around the world. Web viewers can watch, or further interact with the generative graphics.

Designed and developed during a 5-day residency at ScreenLab MediaCityUK 0x01, University of Salford, MediaCityUK

With support from Kit Turner, Elliot Woods, James George
Additional support from Alasdair Swenson, Sunjoy Prabakaran
Special thanks to Chris Allick and Seb Lee-Delisle.
Made with webgl and three.js by Ricardo Cabello aka MrDoob
*/


msa.Skeleton = function(i) {
    this.index = i;

	console.log("msa.Skeleton", this.index);
	
	// joints
	this.joints = [
		// name: name
		// emitThreshold: 0 for no emit, otherwise multiplier for speed threshold to emit
		// parent: parent joint to connect to
		{ name: "head", emitThreshold: 1.5, parent: -1, },	// 0
		{ name: "neck", emitThreshold: 0, parent: 0, },	// 1
		{ name: "leftShoulder", emitThreshold: 0, parent: 1,  },	// 2
		{ name: "leftElbow", emitThreshold: 0, parent: 2, },	// 3
		{ name: "leftHand", emitThreshold: 1, parent: 3, },	// 4
		{ name: "rightShoulder", emitThreshold: 0, parent: 1, },	// 5
		{ name: "rightElbow", emitThreshold: 0, parent: 5, },	// 6
		{ name: "rightHand", emitThreshold: 1, parent: 6, },	// 7
		{ name: "torso", emitThreshold: 0, parent: 1, },	// 8
		{ name: "leftHip", emitThreshold: 0, parent: 8, },	// 9
		{ name: "leftKnee", emitThreshold: 0, parent: 9, },	// 10
		{ name: "leftFoot", emitThreshold: 1.5, parent: 10, },	// 11
		{ name: "rightHip", emitThreshold: 0, parent: 8, },	// 12
		{ name: "rightKnee", emitThreshold: 0, parent: 12, },	// 13
		{ name: "rightFoot", emitThreshold: 1.5, parent: 13, },	// 14
	]
	
//	var jointGeom = new THREE.SphereGeometry(msa.Skeleton.params.jointRadius);
	var jointGeom = new THREE.CubeGeometry(msa.Skeleton.params.jointRadius, msa.Skeleton.params.jointRadius, msa.Skeleton.params.jointRadius);
	var jointMat = new THREE.MeshPhongMaterial({ color: 0 });
	var boneGeom = new THREE.CubeGeometry(msa.Skeleton.params.boneWidth, msa.Skeleton.params.boneWidth, 1);
	var boneMat = new THREE.MeshPhongMaterial({ color: 0 });
	
 	for(var i=0; i<this.joints.length; i++) {
 		var j = this.joints[i];

		var o = new THREE.Mesh(jointGeom, jointMat);	//new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
		o.castShadow = true;
		o.receiveShadow = true;

		this.add(o);
		
		if(j.parent>=0) {
			var b = new THREE.Mesh(boneGeom, boneMat);
 			b.rotation.z = THREE.Math.randFloat(0, 360);
			o.add(b);
		}

		j.oldPosition = new THREE.Vector3(0, 0, 0);     // where the joint was last frame (used for velocity)
		j.velocity = new THREE.Vector3(0, 0, 0);
		j.targetPosition = new THREE.Vector3(0, 0, 0);     // where the joint wants to be (used for smoothing)
		j.object3d = o;     // the drawable three.js object

//		console.log("adding joint", j);
	}

	// alive management
	this.timeSinceLastUpdate = 0;
	var isAlive = false;
	this.centerPos = new THREE.Vector3(0, 0, 0);
};

msa.Skeleton.prototype = new THREE.Object3D;
msa.Skeleton.prototype.constructor = msa.Skeleton;


//-------------------------------------
msa.Skeleton.prototype.setJointPosition = function(index, position) {
	index = index % this.joints.length;
	var j = this.joints[index];
	
    j.targetPosition.copy(position);
	//j.oldPosition.copy(j.object3d.position);
	//j.object3d.position.copy(position);
	//j.velocity = j.object3d.position.clone().subSelf(j.oldPosition);

	this.timeSinceLastUpdate = 0;
	if(debugMode) console.log("Skeleton.setJointPosition", index, position, j);
    this.setVisible(true);
}


//-------------------------------------
msa.Skeleton.prototype.getJointPosition = function(index) {
	index = index % this.joints.length;
	return this.joints[index].object3d.position;
}


//-------------------------------------
msa.Skeleton.prototype.getJointVelocity = function(index) {
	index = index % this.joints.length;
	return this.joints[index].velocity;
}


//-------------------------------------
msa.Skeleton.prototype.setAllJointPositions = function(positionsArray) {
	for(var i=0; i<positionsArray.length; i++) {
		this.setJointPosition(i, positionsArray[i]);
	}
	if(debugMode) console.log("Skeleton.setAllJointPositions", this.index, positionsArray);
}


//-------------------------------------
msa.Skeleton.prototype.update = function(deltaTime) {
	this.timeSinceLastUpdate += deltaTime;

    if(this.timeSinceLastUpdate > msa.Skeleton.params.idleKillTime) {
        this.setVisible(false);
//        return;
    }

    if(this.visible == false) return;

	this.centerPos.set(0, 0, 0);
	for(var i=0; i<this.joints.length; i++) {
		var j = this.joints[i];
		var o = j.object3d;
		
        // update position
        j.oldPosition.copy(o.position);
    	o.position.addSelf(j.targetPosition.clone().subSelf(o.position).multiplyScalar(1 - msa.Skeleton.params.jointSmoothing));

        // update velocity
    	j.velocity.sub(o.position, j.oldPosition);


		// update center position
        this.centerPos.addSelf(o.position);

        // update bones
		var parentIndex = j.parent;
		if(parentIndex>=0) {
/* 			if(debugMode) console.log("joint parent assignment: ", i, parentIndex); */
			var parentPos = this.joints[parentIndex].object3d.position;
			var diffVec = parentPos.clone().subSelf(o.position);
			var diffLen = diffVec.length();
 			o.lookAt(parentPos);
 			if(o.children[0]) {
 				o.children[0].scale.z = diffLen/2;
 				o.children[0].position.z = diffLen/2;
 			}
		}
	}
 	this.centerPos.multiplyScalar(1.0/this.joints.length);
}


//-------------------------------------
msa.Skeleton.prototype.getNumJoints = function() {
	return this.joints.length;
}


//-------------------------------------
msa.Skeleton.prototype.setVisible = function(b) {
    if(this.visible != b) {
        this.visible = b;
        console.log("setting skeleton visiblility", this.index, b);
	    for(var i=0; i<this.joints.length; i++) {
		    var j = this.joints[i];
		    var o = j.object3d;
            o.visible = b;
            if(o.children[0]) o.children[0].visible = b;
        }
    }
}