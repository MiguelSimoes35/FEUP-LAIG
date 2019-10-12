/**
 * MyComponent
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyComponent extends CGFobject {

    constructor(scene, id, materials, primitives = [], components = []){
        super(scene);
        this.id = id;
        this.materials = materials;
        this.transformations;
        this.primitives = primitives;
        this.components = components;
        this.materialIndex = 0;
    }

    getMaterialID(){
        return this.materials[this.materialIndex];
    }
}