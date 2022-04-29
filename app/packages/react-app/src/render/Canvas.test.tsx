import { render } from "@testing-library/react";
import React from "react";
import Canvas from "@my-app/react-app/src/render/Canvas";

test("renders empty red screen using webgl", () => {
  const draw = (gl: WebGLRenderingContext, frameCount: number) => {
    gl.clearColor(1, 0, 0, 1);
  }
  // const { getByText } = render(<Cavnas draw={draw}/>);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
