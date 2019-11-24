#ifdef GL_ES
precision highp  float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec3 vertex;
varying vec2 vTextureCoord;

void main(){

    vec3 vertex = aVertexPosition;

    vertex.x *= 0.25;
    vertex.x += 0.25;
    vertex.y *= 0.25;
    vertex.y += -1; 

    gl_Position = vec4(vertex, 1.0);

    vTextureCoord = aTextureCoord;
    
}