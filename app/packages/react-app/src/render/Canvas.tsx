import React, {useRef, useEffect} from "react";

/**
 * Canvas where given shader rendered
 * 
 * @param drawCall - main draw loop funtion with webgl rendering context and frame count
 * @returns JSX element
 */
const Canvas = ({drawCall}: {drawCall: (gl: WebGL2RenderingContext, frameCount: number) => void}): JSX.Element => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const canvasRef : any = useRef(null) 

  useEffect(() => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const canvas : any = canvasRef.current
    const gl : WebGL2RenderingContext = canvas.getContext('webgl2')
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