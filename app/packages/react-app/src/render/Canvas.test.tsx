import { render } from "@testing-library/react";
import React from "react";
import Canvas from "@my-app/react-app/src/render/Canvas";

test("renders empty red screen using webgl", () => {
  const init = (_gl: WebGL2RenderingContext) => { }
  const draw = (gl: WebGL2RenderingContext, frameCount: number) => {
    gl.clearColor(1, 0, 0, 1);
  }
  // const { getByText } = render(<Canvas initCall={init} drawCall={draw}/>);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
