import React from "react";
import { Container } from "./index.js";
import TextareaCodeEditor from '@uiw/react-textarea-code-editor';
import Canvas from "../render/Canvas"
import ShaderNFT from "../render/ShaderNFT"

interface EditorProps {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    defaultShader: string,
}

const defaultProps: EditorProps = {
    onChange: (_event: React.ChangeEvent<HTMLTextAreaElement>): void => { return },
    defaultShader: `#version 300 es
    precision mediump float;
    in vec2 v_texCoord;
    out vec4 FragColor;
    void main() {
      FragColor = vec4(v_texCoord, 0, 1);
    }`
}

/**
 * 
 */
function Editor(props: EditorProps) : JSX.Element {
    const {onChange, defaultShader}: EditorProps = props;
    
    const [shaderCode, setShaderCode] = React.useState(defaultShader);

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
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {    
        setShaderCode(event.target.value)
        onChange(event);
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
              onChange={handleChange}
            />
        </Container>
    );
}

Editor.defaultProps = defaultProps;

export default Editor;