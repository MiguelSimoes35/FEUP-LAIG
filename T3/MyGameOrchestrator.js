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
                
                var trans = [x * 3.5, 0, y * 3.5];
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
}
