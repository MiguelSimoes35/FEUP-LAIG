/**
 * MyComponent
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyComponent{

    constructor(scene, transformations = mat4.create()){
        this.transformations = transformations;
        this.display();
    }
    display(){}

}