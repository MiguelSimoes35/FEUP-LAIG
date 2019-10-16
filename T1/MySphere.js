/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the sphere
 * @param slices - number of divisions in 
 * @param stacks - number of divisions in 
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
        this.texCoords = []; 

        var i;
        var j;
        
        this.theta = (2 * Math.PI) / this.stacks;
		this.fi = (2 * Math.PI) / this.slices;
		
		var tex_s = 1 / this.slices;
        var tex_t = 1 / this.stacks;

        for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                this.vertices.push(this.radius * Math.cos(this.theta * i) * Math.cos(this.fi * j), this.radius * Math.cos(this.theta * i) * Math.sin(this.fi * j), this.radius * Math.sin(this.theta * i));
				this.normals.push(Math.cos(this.theta * i) * Math.cos(this.fi * j), Math.cos(this.theta * i) * Math.sin(this.fi * j), Math.sin(this.theta * i));
            }
        }

		for (i = 0; i <= this.stacks; i++) {
			for (j = 0; j <= this.slices; j++) {
				this.indices.push(j * this.slices + i, (j + 1) * (this.slices) + i, (j + 1) * this.slices + i + 1);
				this.indices.push(j * this.slices + i, (j + 1) * (this.slices) + i + 1, j * this.slices + i + 1);
			}
		}

		for (i = 0; i <= this.stacks; i++) {
			for (j = 0; j <= this.slices; j++) {
				if(i != 0){
					this.texCoords.push(tex_s * j, 0.5 + tex_t * i);
				}
				this.texCoords.push(tex_s * j, 0.5 - tex_t * i)
			}
		}
		// for the poles
		this.texCoords.push(0.5, 0);
		this.texCoords.push(0.5, 1);

		
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
