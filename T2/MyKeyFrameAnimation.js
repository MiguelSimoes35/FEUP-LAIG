/**
 * MyKeyFrameAnimation
 * @param instant
 * @param translate
 * @param rotate
 * @param scale
 */

class MyKeyFrameAnimation extends MyAnimation {
    constructor(scene, id) {
        super(scene);
        this.id = id;
        this.keyFrames = [];
        this.segment = 0; //keyFrame index
        this.time = 0;
        this.ratio = 1;
        this.flag = true;
        this.aniMatrix = mat4.create();
    }

    update(t) {
        //this.time += t;

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
        else{
            this.flag = false;
        }

        this.time += t;
    }

    apply() {
        
        //create matrix to apply
        
        if(this.flag && (this.segment <= this.keyFrames.length - 1)){
            
            // translations
            var current_trans = [this.keyFrames[this.segment].translate[0] * this.ratio / 100, this.keyFrames[this.segment].translate[1] * this.ratio / 100, this.keyFrames[this.segment].translate[2] * this.ratio / 100];

            // scaling
            var current_sca = [this.keyFrames[this.segment].scale[0] * this.ratio, this.keyFrames[this.segment].scale[1] * this.ratio, this.keyFrames[this.segment].scale[2] * this.ratio];

            this.aniMatrix = mat4.translate(this.aniMatrix, this.aniMatrix, current_trans);
            
            //this.aniMatrix = mat4.rotateX(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[0] * this.ratio * DEGREE_TO_RAD / 100, [1, 0, 0]);
            //this.aniMatrix = mat4.rotateY(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[1] * this.ratio * DEGREE_TO_RAD, [0, 1, 0]);
            //this.aniMatrix = mat4.rotateZ(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[2] * this.ratio * DEGREE_TO_RAD, [0, 0, 1]);
            
            
            //this.aniMatrix = mat4.scale(this.aniMatrix, this.aniMatrix, current_sca);

            this.scene.multMatrix(this.aniMatrix);
        }
        else{
            this.scene.multMatrix(this.aniMatrix);
        }

        //this.scene.multMatrix(this.aniMatrix);
        
        
        
        
        

        // alternative
        /*
        if(this.flag && (this.segment <= this.keyFrames.length - 1)){
            this.scene.translate(this.keyFrames[this.segment].translate[0] * this.ratio, this.keyFrames[this.segment].translate[1] * this.ratio, this.keyFrames[this.segment].translate[2] * this.ratio);

        }
        */
        

        

    }

}
