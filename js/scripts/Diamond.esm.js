
import {DiamondSprite} from './DiamondSprite.esm.js'


export class Diamond extends DiamondSprite{
    constructor(posX, posY, row, column, kind){
        super(posX, posY, row, column, kind, 255);
        this.posX = posX;
        this.posY = posY;
        this.row = row;
        this.column = column;
        this.kind = kind;
        this.match = 0;
    }

    draw(){
        this.drawDiamond();
    }
}