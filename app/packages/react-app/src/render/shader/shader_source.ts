const QUAD_SHADER_SOURCE: string = `#version 300 es
varying vec2 v_texCoord;
void main() {
    vec2 pos = vec2(gl_VertexID & 1, (gl_VertexID & 2) >> 1) * 2 - 1;
	v_texCoord = pos.xy * 0.5 + 0.5;
	gl_Position = vec4(pos.xy, 0, 1);
}
`;

const SAMPLE_FRAGMENT_SHADER_SOURCE: string = `#version 300 es
precision mediump float;
varying vec2 v_texCoord;
void main() {
    gl_FragColor = vec4(v_texCoord, 0, 1);
}
`;

export {QUAD_SHADER_SOURCE, SAMPLE_FRAGMENT_SHADER_SOURCE};