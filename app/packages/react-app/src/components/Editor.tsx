import React from "react";
import { Container } from "./index.js";
import TextareaCodeEditor from '@uiw/react-textarea-code-editor';
import Canvas from "../render/Canvas"
import ShaderNFT from "../render/ShaderNFT"

/**
 * 
 */
function Editor() : JSX.Element {
 
    const [shaderCode, setShaderCode] = React.useState(
`#version 300 es
precision mediump float;
in vec2 v_texCoord;
out vec4 FragColor;
void main() {
  FragColor = vec4(v_texCoord, 0, 1);
}`
    );

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    let shaderNFT: ShaderNFT | null = null;

    // ShaderNFT initialization callback before entering draw-loop
    const init = (gl: WebGL2RenderingContext): void => {
        try {
            shaderNFT = new ShaderNFT(gl, shaderCode);
        } catch(error) {
            console.error(error);
            shaderNFT = null;
        }
    };

    // ShaderNFT drawing callback
    const draw = (gl: WebGL2RenderingContext, frameCount: number): void => {
        gl.clearColor(0, 0, 0, 1);
        if (shaderNFT !== null) {
            shaderNFT.draw(gl, frameCount);
        }
    };

    // Shader editor onchange callback
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {    
        setShaderCode(event.target.value)
        if (shaderNFT !== null) {
            shaderNFT.tryCompile(event.target.value);
        }
    };

    return (
        <Container>
            <Canvas 
                initCall={init}
                drawCall={draw}
            />
            <TextareaCodeEditor
              autoFocus
              value={shaderCode}
              language={"c"}
              minHeight={80}
              placeholder={`Please enter ${("c" || '').toLocaleUpperCase()} code.`}
              style={{
                fontSize: 14,
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
              onChange={onChange}
            />
        </Container>
    );
}

export default Editor;