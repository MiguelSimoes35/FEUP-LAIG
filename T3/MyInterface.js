/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    initMyInterface() {

        // Scale Factor
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        
        // Folder holding 
        //this.gui.add(this.scene, 'selectedView', this.scene.cameraIDs).name('Selected Camera').onChange(this.scene.changeCamera.bind(this.scene));

        // Folder holding Environments
        this.gui.add(this.scene, 'selectedEnvironment', this.scene.environments).name('Environment').onChange(this.scene.changeEnvironment.bind(this.scene));

        // Folder holding lights
        this.lightsFolder = this.gui.addFolder('Lights');

        // start button
        this.gui.add(this.scene, 'start').onChange(function(newValue) {
            this.start = newValue;
        });

        //quit button
        this.gui.add(this.scene, 'quit').onChange(function(newValue) {
            this.quit = newValue;
        });

        // Adding each light's enabled property to the folder
        var i = 0
        for (var key in this.scene.lightIDs) {
            this.lightsFolder.add(this.scene.lights[i], 'enabled').name(key);
            i++
        }
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}