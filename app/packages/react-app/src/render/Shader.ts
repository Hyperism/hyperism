/**
 * WebGL Shader Wrapper class
 */
class Shader {
    private gl: WebGLRenderingContext;
    private vs: WebGLShader;
    private fs: WebGLShader;

    /**
     * Construct shader wrapper with given WebGL context, vertex shader source and fragment shader source
     * 
     * @throws Error if shader compilation failed
     * @param gl WebGL context
     * @param vs_source source code string of vertex shader
     * @param fs_source source code string of fragment shader
     */
    constructor(gl: WebGLRenderingContext, vs_source: string, fs_source: string) {
        this.gl = gl;
        this.vs = this.createShader(gl.VERTEX_SHADER, vs_source);
        this.fs = this.createShader(gl.FRAGMENT_SHADER, fs_source);
    }

    /**
     * Create and Compile WebGL Shader and Returns
     * 
     * @param type Shader types. gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
     * @param source source code string for compilation
     * @returns compiled WebGL Shader
     */
    private createShader = (type: GLenum, source: string): WebGLShader => {
        let shader = this.gl.createShader(type)!;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if ( !this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS) ) {
            let info = this.gl.getShaderInfoLog( shader );
            throw 'Could not compile WebGL program. \n\n' + info;
        }

        return shader;
    }
};

export default Shader;