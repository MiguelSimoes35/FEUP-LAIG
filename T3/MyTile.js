/**
 * MyTile
 * @constructor
 * @param scene
 * @param x
 * @param y
 */

class MyTile extends CGFobject {
    constructor(scene, x, y) {
        super(scene);
        this.x = x;
        this.y = y;

        this.plane = new MyPlane(scene, 10, 10);

        this.gameboard;
        this.piece;
        this.valid = false;
    }

    // class methods 
    toString() {
        return "Tile";
    }

    setPiece(piece) {
        this.piece = piece;
    }

    unsetPiece() {
        this.piece = null;
    }

    getPiece() {
        return this.piece;
    }

    clearValid(){
        this.valid = false;
    }

    // display
    display() {
        this.scene.pushMatrix();
        if(this.valid){
            this.scene.sel_tex.apply();
        }
        else{
            this.scene.tex.apply();
        }
        this.scene.translate(this.x, 0, this.y);
        this.plane.display();
        this.scene.popMatrix();
    }
}
