/**
 * MyGameBoard
 * @constructor
 * @param scene
 */

class MyGameboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.board1 = [];
        this.board2 = [];
        this.board3 = [];
        this.board4 = [];

        this.init();
    }

    // class methods
    init() {    
        this.board1 = new MySubBoard(this.scene, -3, -3, 1);
        this.board2 = new MySubBoard(this.scene, -3, 3, 2);
        this.board3 = new MySubBoard(this.scene, 3, -3, 3);
        this.board4 = new MySubBoard(this.scene, 3, 3, 4);

        this.board1holder = new MyPlane(this.scene, 10, 10);
        this.board2holder = new MyPlane(this.scene, 10, 10);
        this.board3holder = new MyPlane(this.scene, 10, 10);
        this.board4holder = new MyPlane(this.scene, 10, 10);

        this.board1Pieces = [];
    }

    
    addPiece(piece, board, tile){
        // TO DO
    }

    removePiece(piece, board, tile){
        // TO DO
    }

    getPiece(board, tile){
        // TO DO
    }

    getTile(piece){
        // TO DO
    }

    getTile(x, y){
        // TO DO
    }

    movePiece(piece, tile, time){
        //TO DO
    }
    
    // display
    display() {

        // board holder 1
        this.scene.pushMatrix();
        this.scene.translate(-3, -0.1, -3);
        this.scene.black.apply();
        this.scene.scale(5, 5, 5);
        this.scene.registerForPick(25, "Board 1");
        this.board1holder.display();
        this.scene.popMatrix();

        // board holder 2
        this.scene.pushMatrix();
        this.scene.translate(-3, -0.1, 3);
        this.scene.black.apply();
        this.scene.scale(5, 5, 5);
        this.scene.registerForPick(26, "Board 2");
        this.board2holder.display();
        this.scene.popMatrix();

        // board holder 3
        this.scene.pushMatrix();
        this.scene.translate(3, -0.1, -3);
        this.scene.black.apply();
        this.scene.scale(5, 5, 5);
        this.scene.registerForPick(27, "Board 3");
        this.board3holder.display();
        this.scene.popMatrix();

        // board holder 4
        this.scene.pushMatrix();
        this.scene.translate(3, -0.1, 3);
        this.scene.black.apply();
        this.scene.scale(5, 5, 5);
        this.scene.registerForPick(28, "Board 4");
        this.board4holder.display();
        this.scene.popMatrix();

        // displays boards
        this.board1.display();
        this.board2.display();
        this.board3.display();
        this.board4.display();
    }
}
