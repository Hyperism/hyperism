import { render } from "@testing-library/react";
import React, { CanvasHTMLAttributes } from "react";

import Shader from "@my-app/react-app/src/render/Shader";

test("Shader compiles test", () => {
  let vs_source = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    varying vec4 v_color;
    void main() {
        gl_Position = a_position;
        v_color = a_color;
    }
  `;
  let fs_source = `
    precision mediump float;
    varying vec4 v_color;
    void main() {
        gl_FragColor = v_color;
    }
  `;
  var gl = require("gl")(100, 100);
  expect(new Shader(gl, vs_source, fs_source));
});