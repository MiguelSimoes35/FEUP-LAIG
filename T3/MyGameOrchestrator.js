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

        this.gameboard;
        this.animator;

        this.pieceID;
        this.tileID;
        this.boardID;

        this.counter;

        this.timeCounter = 0;
                
        this.init();
    }

    // class methods
    init() {    
        this.gameboard = new MyGameboard(this.scene);
        this.animator = new MyAnimator(this.scene, this.gameboard);
        this.counter = 0;
    }

    display(){
        this.gameboard.display();
        
    }
    
    update(time) {
        this.time = time;
        this.timeCounter += time;
        this.animator.update(time);
    }

    managePick(obj, customId) {
        
        if(this.scene.start == true) {
            if(customId >= 25 && this.counter == 0){

                switch(customId){
                    case 25:
                        this.board = 1;
                        break;
                    case 26:
                        this.board = 2;
                        break;
                    case 27:
                        this.board = 3;
                        break;
                    case 28:
                        this.board = 4;
                        break;
                }

                this.counter++;
            }
            if(customId > 16 && customId < 25 && this.counter == 1) {
                console.log("choose a valid tile!");

                switch(this.board){
                    case 1:
                        this.gameboard.board1.board[8].valid = true;
                        this.gameboard.board1.board[9].valid = true;
                        this.gameboard.board1.board[10].valid = true;
                        this.gameboard.board1.board[4].valid = true;
                        this.gameboard.board1.board[5].valid = true;
                        this.gameboard.board1.board[6].valid = true;
                        break;
                    case 2:
                        this.gameboard.board2.board[8].valid = true;
                        this.gameboard.board2.board[9].valid = true;
                        this.gameboard.board2.board[10].valid = true;
                        this.gameboard.board2.board[4].valid = true;
                        this.gameboard.board2.board[5].valid = true;
                        this.gameboard.board2.board[6].valid = true;
                        break;
                    case 3:
                        this.gameboard.board3.board[8].valid = true;
                        this.gameboard.board3.board[9].valid = true;
                        this.gameboard.board3.board[10].valid = true;
                        this.gameboard.board3.board[4].valid = true;
                        this.gameboard.board3.board[5].valid = true;
                        this.gameboard.board3.board[6].valid = true;
                        break;
                    case 4:
                        this.gameboard.board4.board[8].valid = true;
                        this.gameboard.board4.board[9].valid = true;
                        this.gameboard.board4.board[10].valid = true;
                        this.gameboard.board4.board[4].valid = true;
                        this.gameboard.board4.board[5].valid = true;
                        this.gameboard.board4.board[6].valid = true;
                        break;
                }
                



                this.pieceID = customId;
                this.counter++;
            }
            if(customId <= 16 && this.counter == 2){
                this.tileID = customId;

                switch(this.board){
                    case 1:
                        var x = this.gameboard.board1.board[this.tileID - 1].x - this.gameboard.board1.pieces1[this.pieceID - 17].x;
                        var y = this.gameboard.board1.board[this.tileID - 1].y - this.gameboard.board1.pieces1[this.pieceID - 17].y;

                        var x_final = this.gameboard.board1.board[this.tileID - 1].x;
                        var y_final = this.gameboard.board1.board[this.tileID - 1].y;
                    
                        var trans = [x * 3.5, 0, y * 3.5];
                        var rot = [0, 0, 0];
                        var sca = [1, 1, 1];

                        var kf = new MyKeyFrame(this.scene, 1, trans, rot, sca);

                        var kfa = new MyKeyFrameAnimation(this.scene, "idk", x_final, y_final);
                        kfa.keyFrames.push(kf);

                        this.animator.addAnimation(kfa);
                        this.gameboard.board1.pieces1[this.pieceID - 17].animation = kfa;

                        for(var i = 0; i < this.gameboard.board1.board.length; i++){
                            this.gameboard.board1.board[i].clearValid();
                        }
                        break;
                    case 2:
                        var x = this.gameboard.board2.board[this.tileID - 1].x - this.gameboard.board2.pieces1[this.pieceID - 17].x;
                        var y = this.gameboard.board2.board[this.tileID - 1].y - this.gameboard.board2.pieces1[this.pieceID - 17].y;

                        var x_final = this.gameboard.board2.board[this.tileID - 1].x;
                        var y_final = this.gameboard.board2.board[this.tileID - 1].y;
                    
                        var trans = [x * 3.5, 0, y * 3.5];
                        var rot = [0, 0, 0];
                        var sca = [1, 1, 1];

                        var kf = new MyKeyFrame(this.scene, 1, trans, rot, sca);

                        var kfa = new MyKeyFrameAnimation(this.scene, "idk", x_final, y_final);
                        kfa.keyFrames.push(kf);

                        this.animator.addAnimation(kfa);
                        this.gameboard.board2.pieces1[this.pieceID - 17].animation = kfa;

                        for(var i = 0; i < this.gameboard.board2.board.length; i++){
                            this.gameboard.board2.board[i].clearValid();
                        }
                        break;
                    case 3:
                        var x = this.gameboard.board3.board[this.tileID - 1].x - this.gameboard.board3.pieces1[this.pieceID - 17].x;
                        var y = this.gameboard.board3.board[this.tileID - 1].y - this.gameboard.board3.pieces1[this.pieceID - 17].y;

                        var x_final = this.gameboard.board3.board[this.tileID - 1].x;
                        var y_final = this.gameboard.board3.board[this.tileID - 1].y;
                    
                        var trans = [x * 3.5, 0, y * 3.5];
                        var rot = [0, 0, 0];
                        var sca = [1, 1, 1];

                        var kf = new MyKeyFrame(this.scene, 1, trans, rot, sca);

                        var kfa = new MyKeyFrameAnimation(this.scene, "idk", x_final, y_final);
                        kfa.keyFrames.push(kf);

                        this.animator.addAnimation(kfa);
                        this.gameboard.board3.pieces1[this.pieceID - 17].animation = kfa;

                        for(var i = 0; i < this.gameboard.board3.board.length; i++){
                            this.gameboard.board3.board[i].clearValid();
                        }
                        break;
                    case 4:
                        var x = this.gameboard.board4.board[this.tileID - 1].x - this.gameboard.board4.pieces1[this.pieceID - 17].x;
                        var y = this.gameboard.board4.board[this.tileID - 1].y - this.gameboard.board4.pieces1[this.pieceID - 17].y;

                        var x_final = this.gameboard.board4.board[this.tileID - 1].x;
                        var y_final = this.gameboard.board4.board[this.tileID - 1].y;
                    
                        var trans = [x * 3.5, 0, y * 3.5];
                        var rot = [0, 0, 0];
                        var sca = [1, 1, 1];

                        var kf = new MyKeyFrame(this.scene, 1, trans, rot, sca);

                        var kfa = new MyKeyFrameAnimation(this.scene, "idk", x_final, y_final);
                        kfa.keyFrames.push(kf);

                        this.animator.addAnimation(kfa);
                        this.gameboard.board4.pieces1[this.pieceID - 17].animation = kfa;

                        for(var i = 0; i < this.gameboard.board4.board.length; i++){
                            this.gameboard.board4.board[i].clearValid();
                        }
                        break;
                    
                }

                

                

                this.counter = this.counter - 2;
            }
        }        
    }
}
