/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the sphere
 * @param slices - number of divisions in rotation
 * @param stacks - number of divisions in height
 */
class MySphere extends CGFobject {
	constructor(scene, id, radius, slices, stacks) {
		super(scene);
		this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; //TO DO!!!

        var i;
        var j;
        
        this.theta = (2 * Math.PI) / this.stacks;
        this.fi = (2 * Math.PI) / this.slices;

        for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                this.vertices.push(this.radius * Math.cos(this.theta * i) * Math.cos(this.fi * j), this.radius * Math.cos(this.theta * i) * Math.sin(this.fi * j), this.radius * Math.sin(this.theta * i));
                this.vertices.push(Math.cos(this.theta * i) * Math.cos(this.fi * j), Math.cos(this.theta * i) * Math.sin(this.fi * j), Math.sin(this.theta * i));
            }
        }
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
