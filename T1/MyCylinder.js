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
                this.vertices.push(Math.cos(j * ((2 * Math.PI) / this.slices)), Math.sin(j*((2 * Math.PI) / this.slices)), (this.height * i) / this.stacks);
            }
        }

        var k;
        for (k = 0; k < this.slices * this.stacks; k++) {
            if (k % 2 == 0) {
                this.indices.push(k, k + 1, k + this.slices);
                this.indices.push(k, k + this.slices, k + this.slices - 1, );
                //this.indices.push(k, k + 2, k + 1);
            }
            else {
                this.indices.push(k, k + this.slices, k + this.slices - 1, );
                this.indices.push(k, k + 1, k + this.slices, );
                //this.indices.push(k, k + 1, k + 2);
            }
        }

        var a;
        var b;
        for (a = 0; a <= this.stacks; a++) {
            for (b = 0; b <= this.slices; b++) {
                this.normals.push(Math.cos(b * ((2 * Math.PI) / this.slices)), Math.sin(b * ((2 * Math.PI) / this.slices)), (this.height * a) / this.stacks);
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