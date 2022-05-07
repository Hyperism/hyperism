import { render } from "@testing-library/react";
import React, { CanvasHTMLAttributes } from "react";

import Shader from "@my-app/react-app/src/render/Shader";

test("Shader compiles test", () => {
  let vs_source = `#version 300 es
    attribute vec4 a_position;
    attribute vec4 a_color;
    out vec4 v_color;
    void main() {
        gl_Position = a_position;
        v_color = a_color;
    }
  `;
  let fs_source = `#version 300 es
    precision mediump float;
    in vec4 v_color;
    void main() {
        gl_FragColor = v_color;
    }
  `;

  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const gl: WebGL2RenderingContext | null = canvas.getContext("webgl2", { antialias: false});

  if (gl === null) {
      console.log("WebGL2 not available");
      return;
  }

  expect(new Shader(gl, vs_source, fs_source));
});