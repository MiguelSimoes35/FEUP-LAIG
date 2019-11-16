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
        
        if(this.flag && (this.segment <= this.keyFrames.length - 1) && this.ratio != 0){
            
            // translations
            var current_trans = [this.keyFrames[this.segment].translate[0] * this.ratio / 100, this.keyFrames[this.segment].translate[1] * this.ratio / 100, this.keyFrames[this.segment].translate[2] * this.ratio / 100];

            // scaling
            //var current_sca = [this.keyFrames[this.segment].scale[0] * this.ratio / 100, this.keyFrames[this.segment].scale[1] * this.ratio / 100, this.keyFrames[this.segment].scale[2] * this.ratio / 100];
            var current_sca = [(this.keyFrames[this.segment].scale[0]),
                                 (this.keyFrames[this.segment].scale[1]),
                                  (this.keyFrames[this.segment].scale[2])];
            

            this.aniMatrix = mat4.translate(this.aniMatrix, this.aniMatrix, current_trans);
            
            this.aniMatrix = mat4.rotate(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[0] * (this.ratio / 180) * Math.PI / 180, [1, 0, 0]);
            this.aniMatrix = mat4.rotate(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[1] * (this.ratio / 180) * Math.PI / 180, [0, 1, 0]);
            this.aniMatrix = mat4.rotate(this.aniMatrix, this.aniMatrix, this.keyFrames[this.segment].rotate[2] * (this.ratio / 180) * Math.PI / 180, [0, 0, 1]);
                
            this.aniMatrix = mat4.scale(this.aniMatrix, this.aniMatrix, current_sca);
            //this.scene.scale(this.keyFrames[this.segment].scale[1] + this.ratio, this.keyFrames[this.segment].scale[1] + this.ratio, this.keyFrames[this.segment].scale[2] + this.ratio)


            this.scene.multMatrix(this.aniMatrix);
        }
        else{
            var current_sca = [1, 1, 1];
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
