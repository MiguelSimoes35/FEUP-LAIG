/**
 * MyKeyFrameAnimation
 * @param scene
 * @param instant
 * @param translate
 * @param rotate
 * @param scale
 */

class MyKeyFrame extends CGFobject {
    constructor(scene, instant, translate, rotate, scale) {
        super(scene);
        this.instant = instant;
        this.translate = translate;
        this.rotate = rotate;
        this.scale = scale;
    }
}
