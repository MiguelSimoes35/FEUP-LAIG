/**
 * MyComponent
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyComponent extends CGFobject {

    constructor(scene, id, primitives = [], components = []){
        super(scene);
        this.id = id;
        this.transformations;
        this.primitives = primitives;
        this.components = components;
    }
}