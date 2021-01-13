import {BindToHtml} from './BindToHtml.esm.js';

const CANVAS_ID = 'js-canvas';
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;

export const CANVAS_OFFSET_TOP = 60;
export const CANVAS_OFFSET_LEFT = 100;

class Canvas extends BindToHtml{
    constructor(){
        super(CANVAS_ID);
        this.#initCanvas();
    }

    #initCanvas(){

        this.ctx = this.layer.getContext('2d');
        this.ctx.canvas.width = CANVAS_WIDTH;
        this.ctx.canvas.height = CANVAS_HEIGHT;

    }

    drawCanvasBackground(){

        this.ctx.beginPath();

        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.ctx.fillStyle = '#222009';

        this.ctx.closePath();

    }
}

export const canvas = new Canvas();