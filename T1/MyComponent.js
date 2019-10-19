/**
 * MyComponent
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyComponent extends CGFobject {

    constructor(scene, id, materials, texture, l_s, l_t, primitives = [], components = []){
        super(scene);
        this.id = id;
        this.materials = materials;

        this.texture = texture;
        this.l_s = l_s;
        this.l_t = l_t;

        this.transformations;
        this.primitives = primitives;
        this.components = components;
        this.materialIndex = 0;
    }

    getMaterialID(){
        return this.materials[this.materialIndex];
    }
}