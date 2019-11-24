/**
 * MyPlane
 * @constructor
 * @param scene
 * @param npartsU
 * @param npartsV
 */

class MyPlane extends CGFobject{
    constructor(scene, npartsU, npartsV){
        super(scene);
        this.npartsU = npartsU;
        this.npartsV = npartsV;

        this.surface = [];
        this.makeSurface();
    }

    makeSurface(){
        var cVertexes = [
            [[-0.5, -0.5, 0.0, 1],[-0.5, 0.5, 0.0, 1]],
            [[0.5, -0.5, 0.0, 1],[0.5, 0.5, 0.0, 1]]
        ];

        var nurbsSurface = new CGFnurbsSurface(1, 1, cVertexes);

        var plane = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface);

        this.surface.push(plane);
    }

    display(){
        for (var i = 0; i < this.surface.length; i++) {
            this.scene.pushMatrix();
            this.surface[i].display();
            this.scene.popMatrix();
        }
    }
}
