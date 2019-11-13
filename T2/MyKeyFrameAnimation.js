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
        this.ratio;
    }

    update(t) {
        this.time += t;

        if(this.segment <= this.keyFrames.length - 1){
            
            //Checking for segment
            if(this.keyFrames[this.segment].instant < this.time) {
                this.segment++;
            }

            //calculate ratio of animation
            if(this.segment == 0) {
                this.ratio = 1 - ((this.keyFrames[this.segment].instant - this.time) / 
                                this.keyFrames[this.segment].instant);
            }
            else {
                this.ratio = 1 - ((this.keyFrames[this.segment].instant - this.time) / 
                                    (this.keyFrames[this.segment].instant - this.keyFrames[this.segment - 1].instant));
            }

        }
    }

    apply() {
        //create matrix to apply
        var aniMatrix = mat4.create();

        aniMatrix = mat4.translate(aniMatrix, aniMatrix, this.keyFrames[this.segment].translate * ratio);
        aniMatrix = mat4.rotate(aniMatrix, aniMatrix, this.keyFrames[this.segment].rotate[0] * ratio * DEGREE_TO_RAD, [1, 0, 0]);
        aniMatrix = mat4.rotate(aniMatrix, aniMatrix, this.keyFrames[this.segment].rotate[1] * ratio * DEGREE_TO_RAD, [0, 1, 0]);
        aniMatrix = mat4.rotate(aniMatrix, aniMatrix, this.keyFrames[this.segment].rotate[2] * ratio * DEGREE_TO_RAD, [0, 0, 1]);
        aniMatrix = mat4.scale(aniMatrix, aniMatrix, this.keyFrames[this.segment].scale * ratio);

        this.scene.multMatrix(aniMatrix);
    }

}
