/**
 * MyGameOrchestrator
 * @constructor
 * @param scene
 */

class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);

        this.time = 0;

        this.init();
    }

    // class methods
    init() {    
        
    }
    
    update(time) {
        this.time = time;
    }

    managePick(obj, customId) {
        if(this.scene.start == true) {
            if(customId > 16 && customId < 25) {
                console.log("well done!");
                var kf = new MyKeyFrame(this.scene, this.time + 3, [3, 0, 0], [0, 0, 0], [1, 1, 1]);
                var anim = new MyKeyFrameAnimation(this.scene, "animation");
                anim.keyFrames = kf;
            }
        }        
    }
}
