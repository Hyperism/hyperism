import React, {useRef, useEffect} from "react";

/**
 * @param initCall - initialization function
 * @param drawCall - draw function
 */
interface CanvasProps {
  initCall: (gl: WebGL2RenderingContext) => void,
  drawCall: (gl: WebGL2RenderingContext, frameCount: number) => void
}

/**
 * Canvas where given shader rendered
 * 
 * @param drawCall - main draw loop funtion with webgl rendering context and frame count
 * @returns JSX element
 */
const Canvas = (props: CanvasProps): JSX.Element => {  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const canvasRef : any = useRef(null) 
  const {initCall, drawCall} = props;
  useEffect(() => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const canvas : any = canvasRef.current
    const gl : WebGL2RenderingContext = canvas.getContext('webgl2')

    // Initialize opengl resources before entering drawing loop
    initCall(gl);

    let frameCount = 0
    let animationFrameId : number;
    //Our draw came here
    const render = () => {
      frameCount++
      drawCall(gl, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [drawCall])
  
  return <canvas ref={canvasRef}/>
}

export default Canvas;