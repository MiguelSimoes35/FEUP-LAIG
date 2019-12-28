/**
 * MySubBoard
 * @constructor
 * @param scene
 */

class MySubBoard extends CGFobject {
    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.board = [];
        this.pieces1 = [];
        this.pieces2 = [];

        this.init();
    }

    // class methods
    init() {    
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                this.tile = new MyTile(this.scene, 1.5 - i, -1.5 + j);
                this.board.push(this.tile);
            }
        }

        for(var i = 0; i < 4; i++) {
            this.piece1 = new MyPiece(this.scene, -1.5, -1.5 + i);
            // falta adicionar apontador para a tile
            this.piece2 = new MyPiece(this.scene, 1.5, -1.5 + i);
            // falta adicionar apontador para a tile

            this.pieces1.push(this.piece1);
            this.pieces2.push(this.piece2);
        }
    }
    
    addPiece(piece, board, tile) {
        // TO DO
    }

    removePiece(piece, board, tile) {
        // TO DO
    }

    getPiece(board, tile) {
        // TO DO
    }

    getTile(piece) {
        // TO DO
    }

    getTile(x, y) {
        // TO DO
    }

    movePiece(piece, tile) {
        // TO DO
    }
    
    // display
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.y);

        for(var i = 0; i < this.board.length; i++) {
            //Id for pickable objects must be >= 1
			this.scene.registerForPick(i + 1, this.board[i]);
            this.board[i].display();
        }
        
        for(var i = 0; i < this.pieces1.length; i++) {
            this.scene.default.apply();
            //Id for pickable objects must be >= 1
            this.scene.registerForPick(i + 17, this.pieces1[i]);
            this.pieces1[i].display();
        }

        for(var i = 0; i < this.pieces2.length; i++) {
            this.scene.default.apply();
            //Id for pickable objects must be >= 1
			this.scene.registerForPick(i + 21, this.pieces2[i]);
            this.pieces2[i].display();
        }

        this.scene.popMatrix();
    }
}