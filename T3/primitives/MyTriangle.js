/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param id - ID of the primitive
 * @param x1 - X coordinate of point 1
 * @param x2 - X coordinate of point 2
 * @param x3 - X coordinate of point 3
 * @param y1 - Y coordinate of point 1
 * @param y2 - Y coordinate of point 2
 * @param y3 - Y coordinate of point 3
 * @param z1 - Z coordinate of point 1
 * @param z2 - Z coordinate of point 2
 * @param z3 - Z coordinate of point 3
 */

 class MyTriangle extends CGFobject {
	constructor(scene, id, x1, x2, x3, y1, y2, y3, z1, z2, z3) {
		super(scene);
		this.id = id;
		this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
		this.y1 = y1;
        this.y2 = y2;
		this.y3 = y3;
		this.z1 = z1;
        this.z2 = z2;
		this.z3 = z3;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			this.x1, this.y1, this.z1,
			this.x2, this.y2, this.z2,
			this.x3, this.y3, this.z3

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];

		//Facing Z positive
		this.normals = [];
		this.texCoords = [];

		let vec1 = [this.x2-this.x1, this.y2-this.y1, this.z2-this.z1];
		let vec2 = [this.x3-this.x2, this.y3-this.y2, this.z3-this.z2];

		let norm = vec3.fromValues(vec1[1]*vec2[2]-vec1[2]*vec1[2], vec1[2]*vec2[0]-vec1[0]*vec2[2], vec1[0]*vec2[1]-vec1[1]*vec2[0]);
		vec3.normalize(norm,norm);

		this.normals.push(norm[0], norm[1], norm[2],
						  norm[0], norm[1], norm[2],
						  norm[0], norm[1], norm[2]);

		var a = Math.sqrt(Math.pow(this.x2-this.x1, 2) + Math.pow(this.y2-this.y1,2) + Math.pow(this.z2-this.z1,2));
		var b = Math.sqrt(Math.pow(this.x3-this.x2, 2) + Math.pow(this.y3-this.y2,2) + Math.pow(this.z3-this.z2,2));
		var c = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3,2) + Math.pow(this.z1-this.z3,2));

		var cosAlpha = Math.cos((Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/ (2 * a * c));
		var senAlpha = Math.sqrt(1 - Math.pow(cosAlpha, 2));
		
		this.texCoords.push(0, 0);
		this.texCoords.push(a, 0);
		this.texCoords.push(c * cosAlpha, c * senAlpha);

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
