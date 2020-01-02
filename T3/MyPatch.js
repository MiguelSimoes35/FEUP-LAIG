/**
 * MyPatch 
 * @constructor
 * @param scene
 * @param npointsU
 * @param npointsV
 * @param npartsU
 * @param npartsV
 * @param cPoints
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
        var cVertexes = [];
        var counter = 0;

        for(var i = 0; i < this.cPoints.length; i++) {
            this.cPoints[i].push(1);
        }

        for(var j = 0; j < this.npointsU; j++) {
            var uVector = [];
            for(var k = 0; k < this.npointsV; k++) {
                uVector.push(this.cPoints[counter]);
                counter++;
            }
            cVertexes.push(uVector);
        }

        var nurbsSurface = new CGFnurbsSurface(this.npointsU - 1, this.npointsV - 1, cVertexes);

        var patch = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface);

        this.surface.push(patch);
    }

    display(){
        for (var i = 0; i < this.surface.length; i++) {
            this.scene.pushMatrix();
            this.surface[i].display();
            this.scene.popMatrix();
        }
    }
}
