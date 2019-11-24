#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

varying vec3 vertex;

void main(){

    gl_FragColor = texture2D(uSampler, vTextureCoord);
    
}
