/**
 * MyGameOrchestrator
 * @constructor
 * @param scene
 */

class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);

        this.time = 0;

        this.prolog = new MyPrologInterface();
        this.gameBoard = new MyGameboard(scene);

        this.pieceMoves = [];

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

    getGameBoard() {
        return this.gameBoard;
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
    }

    managePick(obj, customId, tentativa) {
        if(this.scene.start == true) {
            if(customId > 16 && customId < 25) {
                console.log("well done!");
                var kf = new MyKeyFrame(this.scene, this.time + 3, [3, 0, 0], [0, 0, 0], [1, 1, 1]);
                var anim = new MyKeyFrameAnimation(this.scene, "animation");
                anim.keyFrames = kf;
                if(customId == 17) {
                    if(tentativa != []) {
                        for (var i = 0; i < tentativa.length; i++) {
                            this.gameBoard.board1.board[6].valid = true;
                        }
                    }
                }
            }
        }        
    }

    display() {
        this.gameBoard.display();
    }
}
