var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.initCameras();

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(100);

        this.scaleFactor = 1.5;

        this.selectedView = null;
        this.cameraIDs = [];
        
        this.lightIDs = new Object();

        this.lastT = 0;
        this.deltaT = 0;

        // just material
        this.default = new CGFappearance(this);
        this.default.setAmbient(0.1, 0.1, 0.1, 1);
        this.default.setDiffuse(0.9, 0.9, 0.9, 1);
        this.default.setSpecular(0.1, 0.1, 0.1, 1);
        this.default.setShininess(10.0);

        // blue material
        this.blue = new CGFappearance(this);
        this.blue.setAmbient(0.0, 0.0, 0.0, 1);
        this.blue.setDiffuse(0.0, 0.5, 1.0, 1);
        this.blue.setSpecular(0.0, 0.5, 1.0, 1);
        this.blue.setShininess(10.0);

        // black material
        this.black = new CGFappearance(this);
        this.black.setAmbient(0.0, 0.0, 0.0, 1);
        this.black.setDiffuse(0, 0, 0, 1);
        this.black.setSpecular(0, 0, 0, 1);
        this.black.setShininess(10.0);



        //texture
        this.tex = new CGFappearance(this);
        this.tex.setAmbient(0.1, 0.1, 0.1, 1);
        this.tex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tex.setSpecular(0.1, 0.1, 0.1, 1);
        this.tex.setShininess(10.0);
        this.tex.loadTexture('scenes/images/pixel-tile.png');
        this.tex.setTextureWrap('REPEAT', 'REPEAT');

        this.sel_tex = new CGFappearance(this);
        this.sel_tex.setAmbient(0.1, 0.1, 0.1, 1);
        this.sel_tex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sel_tex.setSpecular(0.1, 0.1, 0.1, 1);
        this.sel_tex.setShininess(10.0);
        this.sel_tex.loadTexture('scenes/images/tile-selected.png');
        this.sel_tex.setTextureWrap('REPEAT', 'REPEAT');


        // picking 
        this.setPickEnabled(true);

        this.start = false;
    
        this.gameOrchestrator = new MyGameOrchestrator(this);
    }
    
    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera1 = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 75, 50), vec3.fromValues(0, 0, 0));
        this.fixedcamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-45, 35, 0), vec3.fromValues(0, 0, 0));
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            this.lightIDs[key] = i;

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];

                this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);

                if (light[1] == "spot") {
                    this.lights[i].setSpotCutOff(light[6]);
                    this.lights[i].setSpotExponent(light[7]);
                    this.lights[i].setSpotDirection(light[8][0], light[8][1], light[8][2]);
                }

                this.lights[i].setVisible(true);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
    }

    initMyCameras() {
        for (var id in this.graph.views) {
            this.cameraIDs.push(id);
        }      

        //this.selectedCamera = this.graph.defaultId;
        this.selectedView = this.cameraIDs[0];
        //this.changeCamera();
    }

    changeCamera() {

        // this creates a camera with the selectedView
        //this.camera1 = this.graph.views[this.selectedView];
        // this enables the camera movement
        //this.interface.setActiveCamera(this.camera);
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);
        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);
        this.initMyCameras();
        this.initLights();
        this.interface.initMyInterface();
        this.sceneInited = true;
    }

    update(t) {
        this.lastT = this.lastT;
        this.deltaT = t - this.lastT;
        this.deltaT /= 1000;
        this.currentT += this.deltaT;
        for(var key in this.graph.animations) {
            this.graph.animations[key].update(this.deltaT);
        }

        this.gameOrchestrator.update(this.deltaT);


        this.lastT = t;

        
        //var shaderTime = t / 10000 % 100;
        //this.secCamera.update(shaderTime);
    }


    // picking here
    logPicking() {
		if (this.pickMode == false) {
			if (this.pickResults != null && this.pickResults.length > 0) {
				for (var i = 0; i < this.pickResults.length; i++) {
					var obj = this.pickResults[i][0];
					if (obj) {
						var customId = this.pickResults[i][1];
                        console.log("Picked object: " + obj + ", with pick id " + customId);
                        this.gameOrchestrator.managePick(obj, customId);						
					}
				}
				this.pickResults.splice(0, this.pickResults.length);
			}
		}
	}


    /**
     * Displays the scene.
     */
    display() {

        // picking example
        this.logPicking();
        
        this.clearPickRegistration();
        // ---------------


        this.camera = this.fixedcamera;
        // ---- BEGIN Background, camera and axis setup
        
        // this stops camera movement
        this.interface.setActiveCamera(this.camera);


        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
        this.setDefaultAppearance();
        this.axis.display();

        // Updating lights to enable and disable them
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].update();
        }

        if (this.sceneInited) {
            // Draw axis
            this.setDefaultAppearance();

            //Scale Factor
            var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                        0.0, this.scaleFactor, 0.0, 0.0,
                        0.0, 0.0, this.scaleFactor, 0.0,
                        0.0, 0.0, 0.0, 1.0];
            this.multMatrix(sca);

            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
        }

        this.gameOrchestrator.display();

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }

    
}
