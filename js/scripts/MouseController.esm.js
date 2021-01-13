import {canvas, CANVAS_OFFSET_LEFT, CANVAS_OFFSET_TOP} from './Canvas.esm.js';

class MouseController{
    constructor(){
        this.posX = 0;
        this.posY = 0;
        this.clicked = false;

        canvas.layer.addEventListener('mousedown', this.#mouseEvent)
    }

    #mouseEvent = (e) =>{

        const offset = canvas.layer.getBoundingClientRect();

        this.posX = e.clientX - offset.left - CANVAS_OFFSET_LEFT;
        this.posY = e.clientY - offset.top - CANVAS_OFFSET_TOP;

        this.clicked = true;
    }
}

export const mouseController = new MouseController();