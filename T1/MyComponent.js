/**
 * MyComponent
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyComponent extends CGFobject {

    constructor(scene, id, transformations = mat4.create(), primitives = [], components = []){
        super(scene);
        this.id = id;
        this.transformations = transformations;
        this.primitives = primitives;
        this.components = components;
    }

}