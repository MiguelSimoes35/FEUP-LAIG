/**
* MyCylinder
* @constructor
*/

class MyPatch extends CGFobject{

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

    }

    display(){

    }

    updateBuffers(complexity){
        
    }

}