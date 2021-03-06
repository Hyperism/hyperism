import Shader from "./Shader";
import QUAD_SHADER_SOURCE from "./shader/shader_source";

/**
 * Set of shader and live canvas for rendering ShaderNFT
 * @remarks sustain canvas without crashing when the given shader cannot be compiled
 */
class ShaderNFT {
  private gl: WebGL2RenderingContext;
  private shader: Shader;
  /**
   * @param gl - WebGL context
   * @param source - source code string of fragment shader
   * @param canvas - canvas element to be rendered
   */
  constructor(gl: WebGL2RenderingContext, source: string) {
    this.gl = gl;
    this.shader = new Shader(gl, QUAD_SHADER_SOURCE, source);
  }

  /**
   * Draw shader rendering result on the given context
   * @param gl - WebGL context
   * @param frameCount - frame count
   */
  public draw = (gl: WebGL2RenderingContext, frameCount: number): void => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // TODO(snowapril) : gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.shader.bind();
    if (this.shader.checkUniformExist("u_frameCount")) {
      this.shader.sendUniform1i("u_frameCount", frameCount);
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  /**
   * This callback will be passed into editor onChanged event
   * @param source - source code string of fragment shader
   */
  public tryCompile = (source: string): void => {
    try {
      const newShader: Shader = new Shader(this.gl, QUAD_SHADER_SOURCE, source);
      // When compile success, destroy original shader and replace with new shader
      this.shader.destroy();
      this.shader = newShader;
    } catch (e) {
      console.log(e);
    }
  };
}

export default ShaderNFT;
