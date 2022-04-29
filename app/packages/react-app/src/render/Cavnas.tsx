import React, {useRef, useEffect} from "react";

/**
 * Canvas where given shader rendered
 * 
 * @param drawCall main draw loop funtion with webgl rendering context and frame count
 * @returns JSX element
 */
function Canvas(drawCall : (gl: WebGLRenderingContext, frameCount: number) => void) : JSX.Element {
  
  const canvasRef : any = useRef(null)

  useEffect(() => {
    const canvas : any = canvasRef.current
    const gl : WebGLRenderingContext = canvas.getContext('webgl')
    let frameCount : number = 0
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