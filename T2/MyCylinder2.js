/**
* MyCylinder
* @constructor
*/

class MyCylinder2 extends CGFobject{

    constructor(scene, base, top, height, slices, stacks){
        super(scene);

        this.base = base;
        this.top = top;

        this.height = height;

        this.slices = slices;
        this.stacks = stacks;
        

        this.surface = [];
        
        this.makeSurface();
    }

    makeSurface(){

        var h_top = (this.top * 4) / 3;
        var h_base = (this.base * 4) / 3;

        var cVertexes = [
            /*
            [[-this.base, 0, 0, 1],[-this.top, 0, this.height, 1]],
            [[-this.base, h_base, 0, 1],[-this.top, h_top, this.height, 1]],
            [[this.base, h_base, 0, 1],[this.top, h_top, this.height, 1]],
            [[this.base, 0, 0, 1],[this.top, 0, this.height, 1]]
            */
           
            [[0, -this.base, 0, 1],[0, -this.top, this.height, 1]],
            [[h_base, -this.base, 0, 1],[h_top, -this.top, this.height, 1]],
            [[h_base, this.base, 0, 1],[h_top, this.top, this.height, 1]],
            [[0, this.base, 0, 1],[0, this.top, this.height, 1]]
            
           /*
           [[-this.base, 0, 0, 1],[-this.base, h_base, 0, 1]],
           [[this.base, 0, 0, 1],[this.base, h_base, 0, 1]],
           [[-this.top, 0, this.height, 1],[-this.top, h_top, this.height, 1]],
           [[this.top, 0, this.height, 1], [this.top, h_top, this.height, 1]]
           */
            /*
            [[this.base, h_base, 0, 1],[-this.top, 0, this.height, 1]],
            [[this.base, 0, 0, 1],[-this.top, h_top, this.height, 1]],
            [[-this.base, 0, 0, 1],[this.top, h_top, this.height, 1]],
            [[-this.base, h_base, 0, 1],[this.top, 0, this.height, 1]],
            */
            
            
            
            

        ];

        var nurbsSurface = new CGFnurbsSurface(3, 1, cVertexes);

        var plane = new CGFnurbsObject(this.scene, this.slices, this.stacks, nurbsSurface);

        this.surface.push(plane);

    }

    display(){
        for (var i = 0; i < this.surface.length; i++) {
            this.scene.pushMatrix();
            this.surface[i].display();
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.surface[i].display();
            this.scene.popMatrix();
        }
    }

    updateBuffers(complexity){
        
    }

}