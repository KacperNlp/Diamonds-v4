import {canvas, CANVAS_OFFSET_LEFT, CANVAS_OFFSET_TOP} from './Canvas.esm.js';
import {DIAMOND_HEIGHT, DIAMOND_WIDTH, EMPTY_DIAMOND} from '../data/gameData.esm.js'

export const DIAMOND_SPRITE_FILE_SRC = '/assets/diamonds.png';

export class DiamondSprite{
    constructor(posX, posY, row, column, kind, alpha){
        this.posX = posX;
        this.posY = posY;
        this.row = row;
        this.column = column;
        this.kind = kind;
        this.alpha = alpha;
    }

    drawDiamond(){

        const img = new Image();
        img.src = DIAMOND_SPRITE_FILE_SRC;

        canvas.ctx.beginPath();

        if(this.kind === EMPTY_DIAMOND) return;

        if(this.alpha !== 255) canvas.ctx.globalAlpha = this.alpha/255;

        canvas.ctx.drawImage(
            img,
            DIAMOND_WIDTH * this.kind,
            0,
            DIAMOND_WIDTH,
            DIAMOND_HEIGHT,
            this.posX + CANVAS_OFFSET_LEFT,
            this.posY - DIAMOND_HEIGHT + CANVAS_OFFSET_TOP,
            DIAMOND_WIDTH, 
            DIAMOND_HEIGHT,
        )

        if(this.alpha !== 255) canvas.ctx.globalAlpha = 1;

        canvas.ctx.closePath();
    }
}