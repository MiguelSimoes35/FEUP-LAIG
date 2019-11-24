#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

/* Alterando, a imagem vai escurecer (-> 0) ou clarear (-> 1), pois é o valor maximo da cor */
vec3 maxColor = vec3(0.75);
float centerDistance = 0.0;

uniform float time;

float linesConstant = 8.0;
float height = 10.0;
float speedConstant = 20.0;

void main() {
	
	centerDistance = distance(vTextureCoord.xy, vec2(0.5, 0.5));
	float alpha = abs(cos((vTextureCoord.y * linesConstant) + time * speedConstant) * height);

	vec4 radialGradient = vec4(abs(maxColor.r - centerDistance), 
								abs(maxColor.g - centerDistance), 
								abs(maxColor.b - centerDistance), 
								alpha);

	vec2 aux = vec2(vTextureCoord.x, 1.0 - vTextureCoord.y);
	gl_FragColor = radialGradient * texture2D(uSampler, aux);
}
