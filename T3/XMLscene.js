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

        this.environments = ["Beach", "Woods", "Space"];
        this.selectedEnvironment = "Beach";
        
        this.lightIDs = new Object();

        this.lastT = 0;
        this.deltaT = 0;

        // just material
        this.default = new CGFappearance(this);
        this.default.setAmbient(0.1, 0.1, 0.1, 1);
        this.default.setDiffuse(0.9, 0.9, 0.9, 1);
        this.default.setSpecular(0.1, 0.1, 0.1, 1);
        this.default.setShininess(10.0);
        
        // green material
        this.green = new CGFappearance(this);
        this.green.setAmbient(0.0, 0.7, 0.0, 1);
        this.green.setDiffuse(0.0, 0.7, 0.0, 1);
        this.green.setSpecular(0.0, 0.7, 0.0, 1);
        this.green.setShininess(10.0);
        
        // blue material
        this.blue = new CGFappearance(this);
        this.blue.setAmbient(0.0, 0.0, 0.0, 1);
        this.blue.setDiffuse(0.0, 0.5, 1.0, 1);
        this.blue.setSpecular(0.0, 0.5, 1.0, 1);
        this.blue.setShininess(10.0);

        // purple material
        this.purple = new CGFappearance(this);
        this.purple.setAmbient(0.0, 0.0, 0.0, 1);
        this.purple.setDiffuse(1.0, 0.0, 1.0, 1);
        this.purple.setSpecular(1.0, 0.0, 1.0, 1);
        this.purple.setShininess(10.0);

        // black material
        this.black = new CGFappearance(this);
        this.black.setAmbient(0.0, 0.0, 0.0, 1);
        this.black.setDiffuse(0, 0, 0, 1);
        this.black.setSpecular(0, 0, 0, 1);
        this.black.setShininess(10.0);



        //textures
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

        //skybox

        // beach
        this.beach_lateral = new CGFappearance(this);
        this.beach_lateral.setAmbient(0.1, 0.1, 0.1, 1);
        this.beach_lateral.setDiffuse(0.9, 0.9, 0.9, 1);
        this.beach_lateral.setSpecular(0.1, 0.1, 0.1, 1);
        this.beach_lateral.setShininess(10.0);
        this.beach_lateral.loadTexture('scenes/images/beach-lateral.png');
        this.beach_lateral.setTextureWrap('REPEAT', 'REPEAT');

        this.beach_floor = new CGFappearance(this);
        this.beach_floor.setAmbient(0.1, 0.1, 0.1, 1);
        this.beach_floor.setDiffuse(0.9, 0.9, 0.9, 1);
        this.beach_floor.setSpecular(0.1, 0.1, 0.1, 1);
        this.beach_floor.setShininess(10.0);
        this.beach_floor.loadTexture('scenes/images/beach-floor.png');
        this.beach_floor.setTextureWrap('REPEAT', 'REPEAT');

        // woods
        this.woods_lateral = new CGFappearance(this);
        this.woods_lateral.setAmbient(0.1, 0.1, 0.1, 1);
        this.woods_lateral.setDiffuse(0.9, 0.9, 0.9, 1);
        this.woods_lateral.setSpecular(0.1, 0.1, 0.1, 1);
        this.woods_lateral.setShininess(10.0);
        this.woods_lateral.loadTexture('scenes/images/woods-lateral.png');
        this.woods_lateral.setTextureWrap('REPEAT', 'REPEAT');

        this.woods_floor = new CGFappearance(this);
        this.woods_floor.setAmbient(0.1, 0.1, 0.1, 1);
        this.woods_floor.setDiffuse(0.9, 0.9, 0.9, 1);
        this.woods_floor.setSpecular(0.1, 0.1, 0.1, 1);
        this.woods_floor.setShininess(10.0);
        this.woods_floor.loadTexture('scenes/images/woods-floor.png');
        this.woods_floor.setTextureWrap('REPEAT', 'REPEAT');

        //space
        this.space = new CGFappearance(this);
        this.space.setAmbient(0.1, 0.1, 0.1, 1);
        this.space.setDiffuse(0.9, 0.9, 0.9, 1);
        this.space.setSpecular(0.1, 0.1, 0.1, 1);
        this.space.setShininess(10.0);
        this.space.loadTexture('scenes/images/space.jpg');
        this.space.setTextureWrap('REPEAT', 'REPEAT');






        // picking 
        this.setPickEnabled(true);

        this.start = false;
        this.quit = false;
    
        this.gameOrchestrator = new MyGameOrchestrator(this);
        this.tentativa = this.gameOrchestrator.possibleMoves(1,1);
    }
    
    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera1 = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 75, 50), vec3.fromValues(0, 0, 0));
        this.player1Camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-60, 25, 0), vec3.fromValues(0, 0, 0));
        this.player2Camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(60, 25, 0), vec3.fromValues(0, 0, 0));
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

    changeEnvironment(){
        this.selected_environment = this.selectedEnvironment;
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
                        /*if(customId == 17) {
                            var moves = this.gameOrchestrator.possibleMoves(1, 1);
                            console.log('Moves:');
                            console.log(moves);
                            /*if(moves[3] = [2, 2]) {
                                var tile = this.gameOrchestrator.gameBoard.board3.getTile(-0.5,-0.5);
                                tile.valid = true;
                            }
                        }		*/				
					}
				}
				this.pickResults.splice(0, this.pickResults.length);
			}
		}
    }
    
    closeServer() {
        if (this.quit == true) {
            this.gameOrchestrator.quit();
        }
    }

    /**
     * Displays the scene.
     */
    display() {
        
        // picking example
        this.logPicking();
        this.clearPickRegistration();
        this.gameOrchestrator.display();
        // ---------------
        
        this.camera = this.player1Camera;
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
        this.closeServer();
    }
}
