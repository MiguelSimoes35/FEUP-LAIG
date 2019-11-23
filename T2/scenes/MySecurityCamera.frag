#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

/* Alterando, a imagem vai escurecer (-> 0) ou clarear (-> 1), pois é o valor maximo da cor */
vec3 maxColor = vec3(0.75);
float centerDistance = 0.0;

void main() {
	centerDistance = distance(vTextureCoord.xy, vec2(0.5, 0.5));

	vec4 radialGradient = vec4(abs(maxColor.r - centerDistance), 
								abs(maxColor.g - centerDistance), 
								abs(maxColor.b - centerDistance), 
								1.0);

	vec2 aux = vec2(vTextureCoord.x, 1.0 - vTextureCoord.y);
	gl_FragColor = radialGradient * texture2D(uSampler, aux);
}
