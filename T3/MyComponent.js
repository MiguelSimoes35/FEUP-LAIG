/**
 * MyComponent
 * @constructor
 * @param scene - Reference to MyScene object
 * @param id - ID of the component
 * @param materials - List of the materials of this component
 * @param texture - Texture of this component
 * @param l_s - Scale of the s factor of the texture
 * @param l_t - Scale of the t factor of the texture
 * @param primitives - list of primitive children of this component
 * @param components - list of component children of this component
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
        this.animation;
        this.primitives = primitives;
        this.components = components;
        this.materialIndex = 0;
    }

    getMaterialID(){
        return this.materials[this.materialIndex];
    }
}
