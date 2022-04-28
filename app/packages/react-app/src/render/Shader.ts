class Shader {
    private gl: WebGL2RenderingContext;
    private vs: WebGLShader;
    private fs: WebGLShader;

    constructor(gl: WebGL2RenderingContext, vs_source: string, fs_source: string) {
        this.gl = gl;
        this.vs = this.createShader(WebGL2RenderingContext.VERTEX_SHADER, vs_source);
        this.fs = this.createShader(WebGL2RenderingContext.FRAGMENT_SHADER, fs_source);
    }

    private createShader = (type: GLenum, source: string): WebGLShader => {
        let shader = this.gl.createShader(type);
        if (!shader || !(shader instanceof WebGLShader)) {
            throw new Error('Failed to create shader');
        }
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