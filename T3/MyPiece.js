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

        this.scene = scene;

        this.sphere = new MySphere(scene, 0, 0.5, 30, 30);

        this.teste = new CGFOBJModel(this.scene, 'models/piece.obj');

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
        if(this.animation != undefined){
            this.animation.apply(this);
        }
        this.scene.translate(this.x, 0, this.y);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        //this.scene.translate(0, this.x, this.y);
        
        this.teste.display();
        this.scene.popMatrix();
    }
}