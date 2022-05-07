const QUAD_SHADER_SOURCE = `#version 300 es
out vec2 v_texCoord;
void main() {
    vec2 pos = vec2(gl_VertexID & 1, (gl_VertexID & 2) >> 1) * vec2(2) - vec2(1);
	v_texCoord = pos.xy * 0.5 + 0.5;
	gl_Position = vec4(pos.xy, 0, 1);
}
`;

export default QUAD_SHADER_SOURCE;