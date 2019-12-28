/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param id - ID of the primitive
 * @param baseRadius - Radius of the base of the cylinder
 * @param topRadius - Radius of the top of the cylinder
 * @param height - height of the cylinder
 * @param slices - number of divisions in rotation
 * @param stacks - number of divisions in height
 */
class MyCylinder extends CGFobject {
	constructor(scene, id, baseRadius, topRadius, height, slices, stacks) {
        super(scene);
        this.id = id;
		this.baseRadius = baseRadius;
		this.topRadius = topRadius;
		this.height = height;
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

        var tex_s = 1 / this.slices;
        var tex_t = 1 / this.stacks;

        for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                this.vertices.push((((i * (this.topRadius - this.baseRadius) / this.stacks)) + this.baseRadius) * Math.cos(j * ((2 * Math.PI) / this.slices)), (((i * (this.topRadius - this.baseRadius) / this.stacks)) + this.baseRadius) * Math.sin(j*((2 * Math.PI) / this.slices)), (this.height * i) / this.stacks);
            }
        }

        for (i = 0; i < this.stacks; i++) {
            for (j = 0; j < this.slices; j++) {
                this.indices.push((this.stacks + 1) * (i + 1) + j, (this.stacks + 1) * i + j, (this.stacks + 1) * i + j + 1);
                this.indices.push((this.stacks + 1) * (i + 1) + j, (this.stacks + 1) * i + j + 1, (this.stacks + 1) * (i + 1) + j + 1);

                this.indices.push((this.stacks + 1) * (i + 1) + j, (this.stacks + 1) * i + j + 1, (this.stacks + 1) * i + j);
                this.indices.push((this.stacks + 1) * (i + 1) + j, (this.stacks + 1) * (i + 1) + j + 1, (this.stacks + 1) * i + j + 1);
            }
        }
        
        //normals
        for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                this.normals.push(Math.cos(j * ((2 * Math.PI) / this.slices)), Math.sin(j * ((2 * Math.PI) / this.slices)), Math.atan((this.baseRadius - this.topRadius) / this.height));
            }
        }

        //texCoords
		for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                this.texCoords.push(tex_s * j, 1 - tex_t * i);
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