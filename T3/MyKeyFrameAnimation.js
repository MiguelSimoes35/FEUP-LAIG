/**
 * MyKeyFrameAnimation
 * @param scene
 * @param id
 */

class MyKeyFrameAnimation extends MyAnimation {
    constructor(scene, id, x_final, y_final) {
        super(scene);
        this.id = id;
        this.keyFrames = [];
        this.segment = 0; //keyFrame index
        this.time = 0;
        this.ratio = 1;
        this.flag = true;

        this.x_final = x_final;
        this.y_final = y_final;
        
        this.aniMatrix = mat4.create();
    }

    update(t) {
        if(this.segment <= this.keyFrames.length - 1){
            //calculate ratio of animation
            if(this.segment == 0) {
                this.ratio = 1 - ((this.keyFrames[this.segment].instant - this.time) / 
                                this.keyFrames[this.segment].instant);
            }
            else {
                this.ratio = 1 - ((this.keyFrames[this.segment].instant - this.time) / 
                                    (this.keyFrames[this.segment].instant - this.keyFrames[this.segment - 1].instant));
            }

            //Checking for segment
            if(this.keyFrames[this.segment].instant < this.time) {
                this.segment++;
            }
        }
        else {
            this.flag = false;
        }
        this.time += t;
    }

    apply(piece) {
        //create matrix to apply
        if(this.flag && this.segment <= this.keyFrames.length - 1 && this.ratio != 1){


            // vector translations
            var current_trans = [this.keyFrames[this.segment].translate[0] * this.ratio / 100, 
                                    this.keyFrames[this.segment].translate[1] * this.ratio / 100, 
                                    this.keyFrames[this.segment].translate[2] * this.ratio / 100];

            

            // vector scaling
            var scaleX;
            var scaleY;
            var scaleZ;

            if(this.keyFrames[this.segment].scale[0] == 1){
                scaleX = 1;
            }
            else if(this.keyFrames[this.segment].scale[0] < 1){
                scaleX = this.keyFrames[this.segment].scale[0];
            }
            else{
                scaleX = (this.keyFrames[this.segment].scale[0] * 0.002) + 1;
            }
            if(this.keyFrames[this.segment].scale[1] == 1){
                scaleY = 1;
            }
            else if(this.keyFrames[this.segment].scale[1] < 1){
                scaleY = this.keyFrames[this.segment].scale[1];
            }
            else{
                scaleY = (this.keyFrames[this.segment].scale[1] * 0.002) + 1;
            }
            if(this.keyFrames[this.segment].scale[2] == 1){
                scaleZ = 1;
            }
            else if(this.keyFrames[this.segment].scale[2] < 1){
                scaleZ = this.keyFrames[this.segment].scale[2];
            }
            else{
                scaleZ = (this.keyFrames[this.segment].scale[2] * 0.002) + 1;
            }

            var current_sca = [(scaleX),
                                 (scaleY),
                                  (scaleZ)];

            // apply translation
            this.aniMatrix = mat4.translate(this.aniMatrix, this.aniMatrix, current_trans);
            
            // apply rotation
            this.aniMatrix = mat4.rotate(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[0] * (this.ratio / 180) * Math.PI / 180, [1, 0, 0]);
            this.aniMatrix = mat4.rotate(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[1] * (this.ratio / 180) * Math.PI / 180, [0, 1, 0]);
            this.aniMatrix = mat4.rotate(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[2] * (this.ratio / 180) * Math.PI / 180, [0, 0, 1]);
            
            // apply scaling
            this.aniMatrix = mat4.scale(this.aniMatrix, this.aniMatrix, current_sca);

            this.scene.multMatrix(this.aniMatrix);
            
        }
        else if(this.flag == false){
            piece.x = this.x_final;
            piece.y = this.y_final;
        }
        else{
            var current_sca = [1, 1, 1];
            this.scene.multMatrix(this.aniMatrix);
        }  
        

        
        
    }
}
