class MyAnimator {
    constructor (scene, gameboard) {
        this.scene = scene;
        this.ratio = 1;
        
        this.animations = [];
    }

    update(t){
        
        var i;
        for (i = 0; i < this.animations.length; i++){
            this.animations[i].update(t);
        }


    }

    addAnimation(animation) {
        this.animations.push(animation);
    }





    // old
    /*

    apply(piece, tile){

        if(piece != undefined && tile != undefined){

            this.gameboard.board1.pieces1[piece - 17].x = this.gameboard.board1.board[tile - 1].x;
            this.gameboard.board1.pieces1[piece - 17].y = this.gameboard.board1.board[tile - 1].y;


            //var x = this.gameboard.board1.board[tile - 1].x - this.gameboard.board1.pieces1[piece - 17].x;
            //var y = this.gameboard.board1.board[tile - 1].y - this.gameboard.board1.pieces1[piece - 17].y;
            
            //var trans = [x, 0, y];
            //var rot = [0, 0, 0];
            //var sca = [1, 1, 1];

            //var kf = new MyKeyFrame(this.scene, this.timeCounter + 2, trans, rot, sca);

            //var kfa = new MyKeyFrameAnimation(this.scene, "idk");
            //kfa.keyFrames.push(kf);


            //kfa.apply();



        }
        
    }
    */
}