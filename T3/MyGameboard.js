/**
 * MyGameBoard
 * @constructor
 * @param scene
 */

class MyGameboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.board1 = [];
        this.board2 = [];
        this.board3 = [];
        this.board4 = [];

        this.init();
    }

    // class methods
    init() {    
        this.board1 = new MySubBoard(this.scene, -3, -3);
        this.board2 = new MySubBoard(this.scene, 3, -3);
        this.board3 = new MySubBoard(this.scene, -3, 3);
        this.board4 = new MySubBoard(this.scene, 3, 3);

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
        this.board1.display();
        this.board2.display();
        this.board3.display();
        this.board4.display();
    }
}
