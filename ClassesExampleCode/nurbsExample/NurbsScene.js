
class NurbsScene extends CGFscene {
	constructor() {
		super();
		this.texture = null;
		this.appearance = null;
		this.surfaces = [];
		this.translations = [];
	}

	init(application) {
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0,0,0, 1.0);
		this.gl.clearDepth(10000.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);
		
		this.axis = new CGFaxis(this);
		this.enableTextures(true);
	   

		this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
		this.appearance.setShininess(120);
		this.texture = new CGFtexture(this, "texture.jpg");
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap ('REPEAT', 'REPEAT');
		
		this.surfaces = [];
		

		this.makeSurface(1, // degree on U: 2 control vertexes U
						 1, // degree on V: 2 control vertexes on V
						[	// U = 0
							[ // V = 0..1;
								 [-2.0, -2.0, 0.0, 1 ],
								 [-2.0,  2.0, 0.0, 1 ]
								
							],
							// U = 1
							[ // V = 0..1
								 [ 2.0, -2.0, 0.0, 1 ],
								 [ 2.0,  2.0, 0.0, 1 ]							 
							]
						], // translation of surface 
						[-7.5,0,0]);

		this.makeSurface(2, // degree on U: 3 control vertexes U
						 1, // degree on V: 2 control vertexes on V
						[	// U = 0
							[ // V = 0..1;
								 [ -1.5, -1.5, 0.0, 1 ],
								 [ -1.5,  1.5, 0.0, 1 ]
								
							],
							// U = 1
							[ // V = 0..1
								 [ 0, -1.5, 3.0, 1 ],
								 [ 0,  1.5, 3.0, 1 ]							 
							],
							// U = 2
							[ // V = 0..1							 
								[ 1.5, -1.5, 0.0, 1 ],
								[ 1.5,  1.5, 0.0, 1 ]
							]
						], // translation of surface 
						[-2.5,0,0]);

		this.makeSurface(2, // degree on U: 3 control vertexes U
						 3, // degree on V: 4 control vertexes on V
						[	// U = 0
							[ // V = 0..3;
								 [ -1.5, -1.5, 0.0, 1 ],
								 [ -2.0, -2.0, 2.0, 1 ],
								 [ -2.0,  2.0, 2.0, 1 ],
								 [ -1.5,  1.5, 0.0, 1 ]
								
							],
							// U = 1
							[ // V = 0..3
								 [ 0, 0, 3.0, 1 ],
								 [ 0, -2.0, 3.0, 5 ],
								 [ 0,  2.0, 3.0, 5 ],
								 [ 0,  0, 3.0, 1 ]							 
							],
							// U = 2
							[ // V = 0..3							 
								 [ 1.5, -1.5, 0.0, 1 ],
								 [ 2.0, -2.0, 2.0, 1 ],
								 [ 2.0,  2.0, 2.0, 1 ],
								 [ 1.5,  1.5, 0.0, 1 ]
							]
						], // translation of surface 
						[2.5,0,0]);

		this.makeSurface(2, // degree on U: 3 control vertexes U
						3, // degree on V: 4 control vertexes on V
						[	// U = 0
							[ // V = 0..3;
								 [ -2.0, -2.0, 1.0, 1 ],
								 [ -2.0, -1.0, -2.0, 1 ],
								 [ -2.0, 1.0, 5.0, 1 ],
								 [ -2.0, 2.0, -1.0, 1 ]
							],
							// U = 1
							[ // V = 0..3
								 [ 0, -2.0, 0, 1 ],
								 [ 0, -1.0, -1.0, 5 ],
								 [ 0, 1.0, 1.5, 5 ],
								 [ 0, 2.0, 0, 1 ]
							],
							// U = 2
							[ // V = 0..3
								 [ 2.0, -2.0, -1.0, 1 ],
								 [ 2.0, -1.0, 2.0, 1 ],
								 [ 2.0, 1.0, -5.0, 1 ],
								 [ 2.0, 2.0, 1.0, 1 ]
							]
						], // translation of surface 
						[7.5,0,0]);

		
	};

	makeSurface(degree1, degree2, controlvertexes, translation) {
			
		var nurbsSurface = new CGFnurbsSurface(degree1, degree2, controlvertexes);

		var obj = new CGFnurbsObject(this, 20, 20, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)
		
		this.surfaces.push(obj);	
		this.translations.push(translation);

	}

	initLights() {
		this.lights[0].setPosition(0,0,15,1);
		this.lights[0].setAmbient(0.1,0.1,0.1,1);
		this.lights[0].setDiffuse(0.9,0.9,0.9,1);
		this.lights[0].setSpecular(0,0,0,1);
		this.lights[0].enable();		
		this.lights[0].update();
	};


	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(20, 20, 30), vec3.fromValues(0, 0, 0));
	};

	setDefaultAppearance() {
		this.setAmbient(0.1,0.1,0.1, 1.0);
		this.setDiffuse(0.8,0.8,0.8, 1.0);
		this.setSpecular(0.0, 0.0, 0.0,1.0);
		this.setShininess(10.0);	
	};

	display() {
		// Clear image and depth buffer every time we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();
		
		// Update light used
		this.lights[0].update();


		// Draw axis
		this.axis.display();	

		// draw surfaces
		this.appearance.apply();
		for (var i =0; i<this.surfaces.length; i++) {
			this.pushMatrix();
		
			this.translate(this.translations[i][0], this.translations[i][1], this.translations[i][2]);

			this.surfaces[i].display();
			this.popMatrix();
		}
	};
}