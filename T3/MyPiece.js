/**
 * MyPiece
 * @constructor
 * @param scene
 * @param x
 * @param y
 */

class MyPiece extends CGFobject {
    constructor(scene, x, y) {
        super(scene);
        this.x = x;
        this.y = y;

        this.sphere = new MySphere(scene, 0, 0.5, 30, 30);
        this.tile;

        this.animation;
    }

    // class methods 
    toString() {
        return "Piece";
    }

    
    // display
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.y);
        if(this.animation != undefined){
            this.animation.apply(this);
        }
        this.sphere.display();
        this.scene.popMatrix();
    }
}