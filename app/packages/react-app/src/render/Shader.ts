/**
 * WebGL Shader Wrapper class
 */
class Shader {
  private gl: WebGL2RenderingContext;
  private vs: WebGLShader;
  private fs: WebGLShader;
  private program: WebGLProgram;

  /**
   * Construct shader wrapper with given WebGL context, vertex shader source and fragment shader source
   *
   * @throws Error if shader compilation failed
   * @param gl - WebGL context
   * @param vs_source - source code string of vertex shader
   * @param fs_source - source code string of fragment shader
   */
  constructor(
    gl: WebGL2RenderingContext,
    vs_source: string,
    fs_source: string
  ) {
    this.gl = gl;
    this.vs = this.createShader(gl.VERTEX_SHADER, vs_source);
    this.fs = this.createShader(gl.FRAGMENT_SHADER, fs_source);
    this.program = this.createProgram(this.vs, this.fs);
  }

  /**
   * Create and Compile WebGL Shader and Returns
   *
   * @param type - Shader types. gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
   * @param source - source code string for compilation
   * @returns compiled WebGL Shader
   */
  private createShader = (type: GLenum, source: string): WebGLShader => {
    /* eslint-disable  @typescript-eslint/no-non-null-assertion */
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const info = this.gl.getShaderInfoLog(shader);
      throw "Could not compile WebGL program. \n\n" + info;
    }

    return shader;
  };

  /**
   * Create WebGL Program and Link Shaders
   * @param vs - vertex shader to be linked
   * @param fs - fragment shader to be linked
   * @returns linked WebGL Program
   */
  private createProgram = (vs: WebGLShader, fs: WebGLShader): WebGLProgram => {
    const program = this.gl.createProgram()!;
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);

    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const info = this.gl.getProgramInfoLog(program);
      throw "Could not compile WebGL program. \n\n" + info;
    }

    return program;
  };

  /**
   * @param name - name of uniform variable to be retrieved
   * @returns uniform variable location
   */
  private getUniformLocation = (name: string): WebGLUniformLocation => {
    return this.gl.getUniformLocation(this.program, name)!;
  };

  /**
   *
   * @param name - name of uniform variable will be checked
   * @returns true if uniform variable exists
   */
  public checkUniformExist = (name: string): boolean => {
    return this.getUniformLocation(name) != null;
  };

  /**
   * Send given value to uniform variable of given name
   * @param name - name of uniform variable to be set
   * @param value - value to be set
   */
  public sendUniform1i = (name: string, value: number): void => {
    const location = this.getUniformLocation(name);
    this.gl.uniform1i(location, value);
  };

  /**
   * Send given value to uniform variable of given name
   * @param name - name of uniform variable to be set
   * @param value - value to be set
   */
  public sendUniform1f = (name: string, value: number): void => {
    const location = this.getUniformLocation(name);
    this.gl.uniform1f(location, value);
  };

  /**
   * Bind current shader program to the context
   */
  public bind = (): void => {
    this.gl.useProgram(this.program);
  };

  /**
   * Destroy current linked program and shaders
   */
  public destroy = (): void => {
    this.gl.deleteShader(this.vs);
    this.gl.deleteShader(this.fs);
    this.gl.deleteProgram(this.program);
  };
}

export default Shader;
