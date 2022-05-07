import ShaderNFT from "@my-app/react-app/src/render/ShaderNFT";

test("Shader NFT creation test", () => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const gl: WebGL2RenderingContext | null = canvas.getContext("webgl2", { antialias: false});
  if (gl === null) {
      console.log("WebGL2 not available");
      return;
  }

  const fs_source = `#version 300 es
    precision mediump float;
    in vec4 v_color;
    void main() {
        gl_FragColor = v_color;
    }
  `;

  expect(new ShaderNFT(gl, fs_source));
});