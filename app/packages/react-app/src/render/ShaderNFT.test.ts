import { render } from "@testing-library/react";
import React, { CanvasHTMLAttributes } from "react";
import {QUAD_SHADER_SOURCE, SAMPLE_FRAGMENT_SHADER_SOURCE} from "./shader/shader_source"

import ShaderNFT from "@my-app/react-app/src/render/ShaderNFT";

test("Shader NFT creation test", () => {
  var gl = require("gl")(100, 100);
  expect(new ShaderNFT(gl, SAMPLE_FRAGMENT_SHADER_SOURCE));
});