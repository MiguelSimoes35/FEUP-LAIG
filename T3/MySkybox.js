/**
 * MySkybox
 * @constructor
 * @param scene
 */

class MySkybox extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.plane = new MyPlane(this.scene, 10, 10);
    }

    init(){
        
    }
    
    // display
    display() {

        console.log(this.scene.selectedEnvironment);

        switch(this.scene.selectedEnvironment){
            case "Beach":
                this.scene.beach_lateral.apply();
                break;
            case "Woods":
                this.scene.woods_lateral.apply();
                break;
            case "Space":
                this.scene.space.apply();
                break;
        }
        
        // walls

        // wall1
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(4, -15, 0);
        this.scene.scale(30, 30, 30);
        this.plane.display();
        this.scene.popMatrix();
        
        // wall2
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(4, 0, -15);
        this.scene.scale(30, 30, 30);
        this.scene.rotate(Math.PI / 2, 1, 0 ,0);
        this.plane.display();
        this.scene.popMatrix();

        // wall3
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(4, 0, 15);
        this.scene.scale(30, 30, 30);
        this.scene.rotate(-Math.PI / 2, 1, 0 ,0);
        this.plane.display();
        this.scene.popMatrix();

        // wall4
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(4, 15, 0);
        this.scene.scale(30, 30, 30);
        this.scene.rotate(Math.PI, 1, 0 ,0);
        this.plane.display();
        this.scene.popMatrix();

        switch(this.scene.selectedEnvironment){
            case "Beach":
                this.scene.beach_floor.apply();
                break;
            case "Woods":
                this.scene.woods_floor.apply();
                break;
            case "Space":
                this.scene.space.apply();
                break;
        }

        // floor
        this.scene.pushMatrix();
        this.scene.translate(0, -11, 0);
        this.scene.scale(30, 30, 30);
        this.plane.display();
        this.scene.popMatrix();

    }
}