/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param baseRadius - Radius of the base of the cylinder
 * @param topRadius - Radius of the top of the cylinder
 * @param height - height of the cylinder
 * @param slices - number of divisions in rotation
 * @param stacks - number of divisions in height
 */
class MyCylinder extends CGFobject {
	constructor(scene, id, baseRadius, topRadius, height, slices, stacks) {
		super(scene);
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
        this.texCoords = []; //TO DO!!!

        var i;
        var j;
        for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                //this.vertices.push(Math.sin(j * ((2 * Math.PI) / this.slices)), Math.cos(j*((Math.PI) / this.slices)), (this.height * i) / this.stacks);
                this.vertices.push(this.baseRadius * Math.cos(j * ((2 * Math.PI) / this.slices)), this.baseRadius * Math.sin(j*((2 * Math.PI) / this.slices)), (this.height * i) / this.stacks);
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

        for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                this.normals.push(Math.cos(j * ((2 * Math.PI) / this.slices)), Math.sin(j * ((2 * Math.PI) / this.slices)), 0);
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