/**
 * MyGameOrchestrator
 * @constructor
 * @param scene
 */

class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.time = 0;

        this.prolog;
        this.gameboard;
        this.animator;

        this.pieceID;
        this.tileID;

        this.pieceMoves = [];

        this.counter;
        this.timeCounter = 0;
                
        this.init();
        this.start();
        this.getInitialBoard();
    }

    // class methods
    start() {    //start game and init board in prolog
        this.prolog.request('pvp', function(data) {
            if(data.target.response == "here") {
                console.log("The board is initialized, you can start the game!");
            }
            else {
                console.log("ERROR");
                console.log(data.target.response);
            }
        }); //starting with pvp mode
    }

    // class methods
    init() {    
        this.prolog = new MyPrologInterface();
        this.gameboard = new MyGameboard(this.scene);
        this.animator = new MyAnimator(this.scene, this.gameboard);
        this.counter = 0;
    }

    quit() {    //stop game and close prolog server
        this.prolog.request('quit', function(data) {
            if(data.target.response == "goodbye") {
                console.log("The server is now closed");
            }
            else {
                console.log("ERROR");
                console.log(data.target.response);
            }
        });
    }

    getInitialBoard() {
        var board = [];
        this.prolog.request('board', function(data) {
            var b1 = data.target.response.substring(4, 41);
            var b2 = data.target.response.substring(46, 83);
            var b3 = data.target.response.substring(90, 127);
            var b4 = data.target.response.substring(132, 169);

            var array1 = b1.split('],[', 50);
            var array2 = b2.split('],[', 50);
            var array3 = b3.split('],[', 50);
            var array4 = b4.split('],[', 50);

            var auxboard = [array1, array2, array3, array4];
            for(var i = 0; i < auxboard.length; i++) {
                var auxsubboard = auxboard[i];
                var subboard = [];
                for(var j = 0; j < auxsubboard.length; j++) {
                    var auxline = auxsubboard[j];
                    var line = auxline.split(',', 50);
                    subboard[j] = line;
                }
                board[i] = subboard;
            }
        });
        return board;
    }

    possibleMoves(row, column) {
        var pm = []
        this.prolog.request('moves(' + row + ',' + column + ')', function (data) {
            var response = data.target.response;
            var moves = response.substring(2, (response.length - 2));
            var auxMoves = moves.split('],[', 50);
            for (var i = 0; i < auxMoves.length; i++) {
                var move = auxMoves[i];
                var finalMove = move.split(',', 50);
                pm[i] = finalMove;
            }
        });
        return pm;
    }

    update(time) {
        this.time = time;
        this.timeCounter += time;
        this.animator.update(time);
    }

    managePick(obj, customId) {
        if(this.scene.start == true) {
            if(customId > 16 && customId < 25 && this.counter == 0) {
                console.log("choose a tile!");
                this.pieceID = customId;
                this.counter++;
            }
            if(customId <= 16 && this.counter == 1){
                this.tileID = customId;

                var x = this.gameboard.board1.board[this.tileID - 1].x - this.gameboard.board1.pieces1[this.pieceID - 17].x;
                var y = this.gameboard.board1.board[this.tileID - 1].y - this.gameboard.board1.pieces1[this.pieceID - 17].y;

                var x_final = this.gameboard.board1.board[this.tileID - 1].x;
                var y_final = this.gameboard.board1.board[this.tileID - 1].y;
                
                var trans = [x * 1.8 /*3.5*/, 0, y * 1.8 /*3.5*/];
                var rot = [0, 0, 0];
                var sca = [1, 1, 1];

                var kf = new MyKeyFrame(this.scene, 1, trans, rot, sca);

                var kfa = new MyKeyFrameAnimation(this.scene, "idk", x_final, y_final);
                kfa.keyFrames.push(kf);

                this.animator.addAnimation(kfa);
                this.gameboard.board1.pieces1[this.pieceID - 17].animation = kfa;

                this.counter--;
            }
        }        
    }

    display() {
        this.gameboard.display();
    }
}
