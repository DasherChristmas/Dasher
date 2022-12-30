import createDebug from '../../common/debug';
import vs from './vs.glsl';
import fs from './fs.glsl';

const debug = createDebug('Renderer', '#ff0000');

export default class Renderer {
  private gl: WebGL2RenderingContext | WebGLRenderingContext;
  constructor(private canvas: HTMLCanvasElement) {
    let gl: WebGL2RenderingContext | WebGLRenderingContext | null =
      canvas.getContext('webgl2');
    if (!gl) {
      debug.warn('Unable to get webgl2 context. Falling back to webgl1...');
      gl = canvas.getContext('webgl');
      if (!gl) throw new Error('Unable to get webgl context!');
    }

    this.gl = gl;
  }
}
