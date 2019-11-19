/**
* MyPatch
* @constructor
*/

class MyPatch extends CGFobject{

    constructor(scene, npointsU, npointsV, npartsU, npartsV, cPoints){
        super(scene);

        this.npointsU = npointsU;
        this.npointsV = npointsV;

        this.npartsU = npartsU;
        this.npartsV = npartsV;

        this.cPoints = cPoints;

        this.surface = [];
        
        this.makeSurface();
    }

    makeSurface(){

    }

    display(){

    }

    updateBuffers(complexity){

    }

}