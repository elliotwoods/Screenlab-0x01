/*
Online remote gestural interaction prototype by Memo Akten, www.memo.tv

On-site interactive installation tracks people moving in the space and broadcasts their motion onto the web, their movements visualised in realtime in web browsers around the world. Web viewers can watch, or further interact with the generative graphics.

Designed and developed during a 5-day residency at ScreenLab MediaCityUK 0x01, University of Salford, MediaCityUK

With support from Kit Turner, Elliot Woods, James George
Additional support from Alasdair Swenson, Sunjoy Prabakaran
Special thanks to Chris Allick and Seb Lee-Delisle.
Made with webgl and three.js by Ricardo Cabello aka MrDoob
*/



msa.MessageHandler = function() {
	console.log("msa.MessageHandler")
	this.activeSkeleton = [];
};

msa.MessageHandler.prototype.init = function () {
    // setup websocket handler
    var ws;
    if ("WebSocket" in window) {
        ws = new WebSocket(websocketAddr);
    } else {
        ws = new MozWebSocket(websocketAddr);
    }

    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);
        var addr = data.addr;
        var value = data.value;

/*        // save active skeleton states
        if (addr.search("/screenlab/skeletonactive") >= 0) {
            this.activeSkeleton = value;

            // cycle through skeleton states, and activate / deactivate as nessecary
            // skip first index, as its the index of the active skeleton
            for (var i = 1; i < this.activeSkeleton.length; i++) {
                var si = i - 1;
                if (skeletons[si] == undefined) createSkeleton(si);
                var skeleton = skeletons[si];
                skeleton.setVisible(this.activeSkeleton[i] > 0);
            }
        }
*/

        // update skeleton joint positions
        if (addr.search("/screenlab/skeleton/") >= 0) {
            var lastIndexOf = addr.lastIndexOf("/");
            var si = parseInt(addr.substring(lastIndexOf + 1, addr.length));
//            console.log("addr", si);

            if (skeletons[si] == undefined) createSkeleton(si);
            var skeleton = skeletons[si];

            var posArray = [];
            for (var i = 0; i < value.length; i += 3) {
                posArray.push(new THREE.Vector3(-value[i] * msa.MessageHandler.params.coordinateScaler, value[i + 1] * msa.MessageHandler.params.coordinateScaler, -value[i + 2] * msa.MessageHandler.params.coordinateScaler + msa.MessageHandler.params.zOffset));
            }
            skeleton.setAllJointPositions(posArray);
        }


        if (params.camera.updateMatrices) {
            if (addr.search("/screenlab/screenmatrix/1/projection") >= 0) {
                if (value.length == 16) {
                    camera.forceProjectionMatrix = new THREE.Matrix4(value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9], value[10], value[11], value[12], value[13], value[14], value[15]);
                    camera.updateProjectionMatrix();
                } else {
                    console.log("/screenlab/screenmatrix/1/projection length is not correct", value.length);
                }
                /*         	console.log("camera.forceProjectionMatrix", camera.forceProjectionMatrix); */
            }

            if (addr.search("/screenlab/screenmatrix/1/view") >= 0) {
                if (value.length == 16) {
                    camera.forceViewMatrix = new THREE.Matrix4(value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9], value[10], value[11], value[12], value[13], value[14], value[15]);
                    camera.updateMatrixWorld(true);
                } else {
                    console.log("/screenlab/screenmatrix/1/view length is not correct", value.length);
                }
                /*         	console.log("camera.forceProjectionMatrix", camera.forceProjectionMatrix); */
            }
        } else {
            if (camera.forceProjectionMatrix != undefined) camera.forceProjectionMatrix = undefined;
            if (camera.forceViewMatrix != undefined) camera.forceViewMatrix = undefined;

        }



        if (debugMode) {
            console.log("MessageHandler.onmessage", data);
            document.getElementById('credits').innerHTML = "received " + addr + " " + value.length + " items<br />";
            for (var i = 0; i < value.length; i++) {
                document.getElementById('credits').innerHTML += "[" + i + ":" + value[i] + "] ";
            }
            console.log("this.activeSkeleton", this.activeSkeleton);
        }


    }

    ws.onopen = function (event) {
    }
}