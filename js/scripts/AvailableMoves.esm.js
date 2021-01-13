import { EMPTY_DIAMOND, NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from '../data/gameData.esm.js';
import {game} from './Game.esm.js'

class AvailableMoves{

    checkAvailableMoves(){

        if(game.gameState.isMoving) return false;

        const isPossibleToMoves = game.gameState.getGameBoard().some((diamond, id, diamonds) =>{

            if(diamond.kind === EMPTY_DIAMOND) return;

            //row - left side
            if(
                diamond.column < NUMBER_OF_COLUMNS - 3
                && diamond.kind === diamonds[id + 2].kind
                && diamond.kind === diamonds[id + 3].kind
            ){
                return true;
            }

            //row - right side

            if(
                diamond.column > 2
                && diamond.kind === diamonds[id - 2].kind
                && diamond.kind === diamonds[id - 3].kind
            ){
                return true;
            }

            //column  (diamond moves to right) - diamond is at the top left of diamonds column
            if(
                diamond.column < NUMBER_OF_COLUMNS
                && diamond.row < NUMBER_OF_ROWS - 2
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[id + (NUMBER_OF_COLUMNS * 2) + 1].kind
            ){
                return true;
            }

            //column (diamond moves to right) - diamond is in the center on the left side of the diamonds column
            if(
                diamond.column < NUMBER_OF_COLUMNS 
                && diamond.row > 1
                && diamond.row < NUMBER_OF_ROWS - 1
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS + 1].kind
            ){
                return true;
            }

            //column (diamond moves to right) - diamond is at the bottom left side of the diamonds column
            if(
                diamond.column < NUMBER_OF_COLUMNS
                && diamond.row > 2
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[id - (NUMBER_OF_COLUMNS * 2) + 1]
            ){
                return true;
            }

            //column (diamond moves to left) - diamond is at the top right side of the diamonds column
            if(
                diamond.column > 0
                && diamond.row > NUMBER_OF_ROWS - 2
                && diamond.kind === diamonds[id + NUMBER_OF_ROWS - 1].kind
                && diamond.kind === diamonds[id + (NUMBER_OF_ROWS * 2) - 1].kind
            ){
                return true;
            }

            //column (diamond moves to left) - diamond is in the center on the right side of the diamonds column
            if(
                diamond.column > 0
                && diamond.row > 1
                && diamond.row < NUMBER_OF_ROWS - 1
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS - 1].kind
            ){
                return true;
            }

            //column (diamond moves to left) - diamond is at bottom right side of the diamonds column
            if(
                diamond.column > 0
                && diamond.row > 2
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[id - (NUMBER_OF_COLUMNS * 2) - 1].kind
            ){
                return true;
            }

            //column (diamond moves to bottom) - diamond is above diamonds column
            if(
                diamond.row < NUMBER_OF_ROWS - 3
                && diamond.kind === diamonds[id + (NUMBER_OF_COLUMNS * 2)].kind
                && diamond.kind === diamonds[id + (NUMBER_OF_COLUMNS * 3)].kind
            ){
                return true;
            }

            //column (diamond moves to top) - diamond is under diamonds column
            if(
                diamond.row > 3
                && diamond.kind === diamonds[id - (NUMBER_OF_COLUMNS * 2)].kind
                && diamond.kind === diamonds[id - (NUMBER_OF_COLUMNS * 3)].kind
            )

            //row (diamond moves to bottom) - diamond  is above diamonds row (left side of diamonds row)
            if(
                diamond.row < NUMBER_OF_ROWS - 1
                && diamond.column < NUMBER_OF_COLUMNS - 2
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS + 2].kind
            ){
                return true
            }

            //row (diamond moves to bottom) - diamond  is above diamonds row (center of diamonds row)
            if(
                diamond.row < NUMBER_OF_ROWS - 1
                && diamond.column < NUMBER_OF_COLUMNS - 1
                && diamond.column > 0
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS - 1].kind
            ){
                return true
            }

            //row (diamond moves to bottom) - diamond  is above diamonds row (right side of diamonds row)
            if(
                diamond.row < NUMBER_OF_ROWS - 1
                && diamond.column > 1
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[id + NUMBER_OF_COLUMNS - 2].kind
            ){
                return true
            }

            //row (diamond moves to top) - diamond in uner diamonds row (left side of diamond row)
            if(
                diamond.row > 1
                && diamond.column < NUMBER_OF_COLUMNS - 2
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS + 2].kind
            ){
                return true
            }

            //row (diamond moves to top) - diamond is under diamonds row (center of diamonds row)
            if(
                diamond.row > 1
                && diamond.column < NUMBER_OF_COLUMNS - 1
                && diamond.column > 0
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS - 1].kind
            ){
                return true
            }

            //row (diamond moves to top) - diamond is under diamonds row (right side of diamonds row)
            if(
                diamond.row > 1
                && diamond.column > 1
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[id - NUMBER_OF_COLUMNS - 2].kind
            ){
                return true
            }

        })

        if(!isPossibleToMoves){
            game.gameState.mixDiamonds();
        }
    }

}

export const availableMoves = new AvailableMoves();