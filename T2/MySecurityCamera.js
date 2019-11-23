/**
 * MySecurityCamera
 * @constructor
 * @param scene
 */

class MySecurityCamera extends CGFobject {
    constructor(scene) {
        super(scene);
        this.securityImage = new MyRectangle(scene, 1, 0.5, 1, -1, -0.5);

        this.securityShader = new CGFshader(this.scene.gl, "scenes/MySecurityCamera.vert", "scenes/MySecurityCamera.frag");
        this.securityShader.setUniformsValues({uSampler: 0});
        this.securityShader.setUniformsValues({h_res: this.scene.gl.canvas.width});
        this.securityShader.setUniformsValues({v_res: this.scene.gl.canvas.heigth});
    }

    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.securityShader);
        this.scene.rttTexture.bind();
        this.securityImage.display();
        this.scene.rttTexture.unbind();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
