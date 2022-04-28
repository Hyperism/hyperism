import Shader from "./Shader";

/**
 * Set of shader and live canvas for rendering ShaderNFT
 */
class ShaderNFT {
    private gl: WebGLRenderingContext;
    private shader: Shader;
    private canvas : HTMLCanvasElement;

    /**
     * 
     * @param gl WebGL context
     * @param vs_source source code string of vertex shader
     * @param fs_source source code string of fragment shader
     * @param canvas canvas element to be rendered
     */
    constructor(gl: WebGLRenderingContext, vs_source: string, fs_source: string, canvas: HTMLCanvasElement) {
        this.gl = gl;
        this.canvas = canvas;
        this.shader = new Shader(gl, vs_source, fs_source);
    }
};

export default ShaderNFT;