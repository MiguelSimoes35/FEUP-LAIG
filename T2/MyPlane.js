/**
* MyPlane
* @constructor
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
            [[-2.0, -2.0, 0.0, 1],[-2.0, 2.0, 0.0, 1]]
                ,[[2.0, -2.0, 0.0, 1],[2.0, 2.0, 0.0, 1]]
        ];


        var nurbsSurface = new CGFnurbsSurface(1, 1, cVertexes);

        var plane = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

        this.surface.push(plane);

    }

    display(){
        for (var i = 0; i < this.surface.length; i++) {
            this.scene.pushMatrix();
            this.surface[i].display();
            this.scene.popMatrix();
        }
    }

    // missing this
    updateBuffers(complexity){
        
    }

}