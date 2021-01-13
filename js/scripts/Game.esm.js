import { DIAMOND_HEIGHT, DIAMOND_WIDTH, EMPTY_DIAMOND, gameLevels, NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, NUMBER_OF_DIAMONDS} from '../data/gameData.esm.js';
import {BindToHtml} from './BindToHtml.esm.js';
import { canvas } from './Canvas.esm.js';
import {GameState} from './GameState.esm.js'
import { levelsLayer } from './LevelsLayer.esm.js';
import {mouseController} from './MouseController.esm.js';
import { HIDDEN_LAYER, visibilityOfLayer, VISIBLE_LAYER } from './VisibilityOfLayer.esm.js';
import {message, MESSAGE_LAYER_ID, MESSAGE_CONTAINER_ID} from './Message.esm.js';
import { storage } from './Storage.esm.js';
import { media } from './Media.esm.js';
import {settings, SETTINGS_CONTAINER_ID, SETTINGS_LAYER_ID} from './Settings.esm.js';
import { animations } from './Animations.esm.js';
import {availableMoves} from './AvailableMoves.esm.js';

const GAME_LAYER_ID = 'js-game-map'
const RETURN_BUTTON_ID = 'js-game-layer-return-button';
const SETTINGS_BUTTON_ID = 'js-game-layer-settings-button';

//stats tags id
const HIGHT_SCORE_TAG_ID = 'js-hight-score';
const REQUIRED_SCORE_TAG_ID = 'js-required-score';
const CURRENT_SCORE_TAG_ID = 'js-current-score';
const MOVEMENT_TAG_ID = 'js-movement';

const SWAP_ANIMATION_SPEED = 6;
const TRANSPARENCY_SPEED = 25;

class Game extends BindToHtml{
    constructor(){
        super(GAME_LAYER_ID);
    }

    startNewGame(level = 1){

        const {kindOfDiamonds, playerMovement, requiredScore, gameBoard} = gameLevels[level - 1];

        const isUnlocked = storage.levelIsUnlocked(level);
        const highestScore = storage.getHighestScore(level);

        if(!isUnlocked) return

        this.gameState = new GameState(level, requiredScore, playerMovement, gameBoard(kindOfDiamonds), kindOfDiamonds, highestScore);

        this.#returnButtonHandle();
        this.#settingsButtonHandle();
        this.#gamePanel();
    }

    //return to levels layer
    #returnButtonHandle(){

        const button = this.bindToHtmlById(RETURN_BUTTON_ID);

        button.addEventListener('click', ()=>{

            this.gameState.isActive = false;

            visibilityOfLayer.changeVisibilityOfLayer(levelsLayer.layer, VISIBLE_LAYER);
            visibilityOfLayer.changeVisibilityOfLayer(this.layer, HIDDEN_LAYER);
            levelsLayer.initLevelsLayer();

        })
    }

    #settingsButtonHandle(){
        const button = this.bindToHtmlById(SETTINGS_BUTTON_ID);

        button.addEventListener('click', ()=>{
            animations.inputAnimation(SETTINGS_LAYER_ID, SETTINGS_CONTAINER_ID);
            visibilityOfLayer.changeVisibilityOfLayer(settings.layer, VISIBLE_LAYER);
        })
    }


    #gamePanel(){

        if(this.gameState.isActive){
            this.#clickOnDiamond();
            this.#getClickedDiamond();
            this.#matchDiamonds();
            this.#swapAnimation();
            this.#disappearMatchedDiamonds();
            this.#increaseScore();
            this.#revertSwap();
            this.#clearMatched();
            this.#updateGameStats();
            canvas.drawCanvasBackground();
            this.#drawDiamonds();
            availableMoves.checkAvailableMoves();
            this.#checksEndOfGame();
        }
        
    }

    //increase number of diamonds clicked by the user
    #clickOnDiamond(){

        const isMoving = !this.gameState.isMoving;
        const isSwapping = !this.gameState.isSwapping;

        if(isMoving && isSwapping && mouseController.clicked){
            this.gameState.clickedDiamonds++;
        }

    }

    #getClickedDiamond(){

        if(!mouseController.clicked) return;

        const diamondRow = Math.floor((mouseController.posY + DIAMOND_HEIGHT )/ DIAMOND_HEIGHT);
        const diamondColumn = Math.floor(mouseController.posX / DIAMOND_WIDTH);

        //if the player clicks outside the map
        if(diamondRow < 0 || diamondRow > NUMBER_OF_ROWS || diamondColumn > NUMBER_OF_COLUMNS){

            this.gameState.clickedDiamonds = 0;
            mouseController.clicked = false;
            return;
            
        }


        const clickedDiamond = this.gameState.clickedDiamonds;

        //first click
        if(clickedDiamond === 1){

            console.log(diamondColumn, diamondRow)

            this.gameState.firstDiamond = {
                row: diamondRow, 
                column: diamondColumn,
            }

        }else if(clickedDiamond === 2){//second click

            this.gameState.secondDiamond = {
                row: diamondRow, 
                column: diamondColumn,
            }


            this.gameState.clickedDiamonds = 0;

            const {row : firstRow, column : firstColumn} = this.gameState.firstDiamond;
            const {row : secondRow, column : secondColumn} = this.gameState.secondDiamond;

            //if diamonds aren't close (columns or rows where they are must be next to each other) then return
            if( Math.abs(firstColumn - secondColumn) + Math.abs(firstRow - secondRow) !== 1){

                mouseController.clicked = false;
                return;

            }

            this.#swapDiamonds();
            this.gameState.isSwapping = true;
            this.gameState.decreaseMovement();

        }

        mouseController.clicked = false;
    }


    #matchDiamonds(){

        this.gameState.getGameBoard().forEach((diamond, index, diamonds) =>{

            if(diamond.kind === EMPTY_DIAMOND) return;


            const lastColumn = NUMBER_OF_COLUMNS - 1;

            //match in row
            if(diamond.column > 0 && diamond.column < lastColumn){


                if(
                    diamond.kind === diamonds[index - 1].kind 
                    && diamond.kind === diamonds[index + 1].kind 
                    && diamonds[index - 1].row === diamond.row 
                    && diamonds[index + 1].row === diamond.row
                    ){

                    diamond.match++;
                    diamonds[index - 1].match++;
                    diamonds[index + 1].match++;
                }

            }

            const lastRow = NUMBER_OF_ROWS - 1

            //match in colum
            if(diamond.row > 1 && diamond.row < lastRow){

                if(diamond.kind === diamonds[index + NUMBER_OF_COLUMNS].kind && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS].kind){

                    diamond.match++;
                    diamonds[index + NUMBER_OF_COLUMNS].match++;
                    diamonds[index - NUMBER_OF_COLUMNS].match++;

                }

            }
        })
    }

    #swapAnimation(){

        this.gameState.isMoving = false;

        this.gameState.getGameBoard().forEach(diamond =>{

            let differenceInRow;
            let differenceInColumn;

            for(let swapSpeed = 0; swapSpeed < SWAP_ANIMATION_SPEED; swapSpeed++){

                differenceInRow = (diamond.column * DIAMOND_WIDTH) - diamond.posX;
                differenceInColumn = (diamond.row * DIAMOND_HEIGHT) - diamond.posY;

                //row
                if(differenceInRow){
                    diamond.posX += differenceInRow/Math.abs(differenceInRow);
                }

                //column
                if(differenceInColumn){
                    diamond.posY += differenceInColumn/Math.abs(differenceInColumn);
                }

            }

            if(differenceInColumn || differenceInRow){
                this.gameState.isMoving = true;
            }

        })
    }


    #disappearMatchedDiamonds(){

        if(this.gameState.isMoving) return;

        this.gameState.getGameBoard().forEach(diamond =>{

           if(!!diamond.match && diamond.alpha >= TRANSPARENCY_SPEED){
                this.gameState.isMoving = true;
                diamond.alpha -= TRANSPARENCY_SPEED;
                media.playSwapSound();
            }else if(diamond.alpha <= TRANSPARENCY_SPEED){
                diamond.alpha = 0;
            }

        })

    }

    #increaseScore(){

        this.score = 0;

        this.gameState.getGameBoard().forEach(diamond =>{
            this.score += diamond.match;
        })

        if(!!this.score && !this.gameState.isMoving){
            this.gameState.increaseCurrentScore(this.score);
        }
    }

    //if diamonds won't matched
    #revertSwap(){

        if(!this.gameState.isMoving && this.gameState.isSwapping){
    
            if(!this.score){
                this.#swapDiamonds();
                this.gameState.increaseMovement();
            }
    
            this.gameState.isSwapping = false;
        }
    
    }
    

    #clearMatched(){

        if(!this.gameState.isMoving){

            let needToGenerateNewDiamonds = false;//if any diamond will disappeared then game will have to generate a new diamond/diamonds

            this.gameState.getGameBoard().forEach((diamond, index, diamonds) =>{

                /*if any diamond will had alpha equal to 0 (will be invisible) and this diamond is not empty then change props of this diamond (take this props from diamond above  current diamond) and generate new diamond*/
                if(diamond.alpha <= 0 && diamond.kind !== EMPTY_DIAMOND){

                    this.gameState.isMoving = true;
                    needToGenerateNewDiamonds = true;

                    let id = index;

                    //take props from diamond above of our current diamond
                    for(let row = diamond.row; row > 0; row--){

                        this.#dimaondFalling(diamonds[id], diamonds[id - NUMBER_OF_COLUMNS])

                        id -= NUMBER_OF_COLUMNS;

                    }
                }

                //if it's last diamond from array and game have to generate new diamond/daimonds
                if(index === NUMBER_OF_DIAMONDS - 1 && needToGenerateNewDiamonds){
                    this.#generateNewDiamonds();
                }
            })
        }

    }



    #generateNewDiamonds(){

        if(this.gameState.isMoving){

            this.gameState.getGameBoard().forEach((_, index, diamonds)=>{
            
                const currentDiamondId = NUMBER_OF_DIAMONDS - 1 - index;

                if(diamonds[currentDiamondId].kind === EMPTY_DIAMOND && currentDiamondId > NUMBER_OF_COLUMNS){
                    diamonds[currentDiamondId].alpha = 0;
                }


                if(currentDiamondId < NUMBER_OF_COLUMNS){

                    diamonds[currentDiamondId].kind = EMPTY_DIAMOND;
                    diamonds[currentDiamondId].match = 0;
                    diamonds[currentDiamondId].alpha = 0;

                }else if(diamonds[currentDiamondId].kind === EMPTY_DIAMOND || diamonds[currentDiamondId].alpha <= 0){

                    let generatedDiamondId = diamonds[currentDiamondId].column + NUMBER_OF_COLUMNS;


                    diamonds[generatedDiamondId].kind = Math.floor(Math.random() * this.gameState.kindsOfDiamond);
                    diamonds[generatedDiamondId].alpha = 255;
                    diamonds[generatedDiamondId].match = 0;
                    diamonds[generatedDiamondId].posY = 0;
                    diamonds[generatedDiamondId].posX = diamonds[currentDiamondId].column * DIAMOND_WIDTH;


                    while(diamonds[currentDiamondId].alpha !== 255){
                        this.#swap(diamonds[generatedDiamondId], diamonds[generatedDiamondId + NUMBER_OF_COLUMNS]);

                        generatedDiamondId += NUMBER_OF_COLUMNS;
                    }

                }
            })
        }
    }

    //update/set stats in HTML
    #updateGameStats(){

        const hightScoreContainer = this.bindToHtmlById(HIGHT_SCORE_TAG_ID);
        const requiredScoreContainer = this.bindToHtmlById(REQUIRED_SCORE_TAG_ID);
        const currentScoreContainer = this.bindToHtmlById(CURRENT_SCORE_TAG_ID);
        const movementContainer = this.bindToHtmlById(MOVEMENT_TAG_ID);

        hightScoreContainer.textContent = this.gameState.getHighestScore();
        requiredScoreContainer.textContent = this.gameState.getRequiredScore();
        currentScoreContainer.textContent = this.gameState.currentScore;
        movementContainer.textContent = this.gameState.getMovement();

    }

    #drawDiamonds(){
        this.gameState.getGameBoard().forEach(diamond => {
            diamond.draw();
        })
    }

    #checksEndOfGame(){

        const hasNoMoves = this.gameState.getMovement();

        if(!hasNoMoves && !this.gameState.isMoving){

            const score = this.gameState.currentScore;
            const isWon = this.gameState.playerHasWon();
            const isNewRecord = this.gameState.recordIsBroken();
            const currentLevel = this.gameState.getLevel();

            if(isNewRecord){
                storage.setNewRecord(currentLevel, score);
            }

            if(isWon){
                storage.unlockNextLevel(currentLevel);
            }

            animations.inputAnimation(MESSAGE_LAYER_ID, MESSAGE_CONTAINER_ID);
            visibilityOfLayer.changeVisibilityOfLayer(message.layer, VISIBLE_LAYER);
            message.initMessage(isWon, score, isNewRecord)


        }else{

            this.animationFrame = window.requestAnimationFrame(()=> this.#gamePanel());

        }


    }


    #swapDiamonds(){

        const {row : firstRow, column : firstColumn} = this.gameState.firstDiamond;
        const {row : secondRow, column : secondColumn} = this.gameState.secondDiamond;

        const firstDiamondId = firstRow * NUMBER_OF_COLUMNS + firstColumn;
        const secondDiamondId = secondRow * NUMBER_OF_COLUMNS + secondColumn;


        const firstDiamond =  this.gameState.getGameBoard()[firstDiamondId];
        const secondDiamond = this.gameState.getGameBoard()[secondDiamondId];

        this.#swap(firstDiamond, secondDiamond);

    }

    #swap(firstDiamond, secondDiamond){

        [
            firstDiamond.posX,
            firstDiamond.posY,
            firstDiamond.match,
            firstDiamond.kind,
            firstDiamond.alpha,
            secondDiamond.posX,
            secondDiamond.posY,
            secondDiamond.match,
            secondDiamond.kind,
            secondDiamond.alpha,
        ] = [
            secondDiamond.posX,
            secondDiamond.posY,
            secondDiamond.match,
            secondDiamond.kind,
            secondDiamond.alpha,
            firstDiamond.posX,
            firstDiamond.posY,
            firstDiamond.match,
            firstDiamond.kind,
            firstDiamond.alpha,
        ];

        this.gameState.isMoving = true;
    }

    //this is for diamonds falling animation (diamond under other diamond will take his props)
    #dimaondFalling(diamondOnBottom, diamondOnTop){
        [
            //diamond on bottom
            diamondOnBottom.kind,
            diamondOnBottom.match,
            diamondOnBottom.posX,
            diamondOnBottom.posY,
            diamondOnBottom.alpha,
            //diamond on top
            diamondOnTop.kind,
            diamondOnTop.match,
            diamondOnTop.posX,
            diamondOnTop.posY,
            diamondOnTop.alpha,
        ]=[
            //props for diamond on bottom
            diamondOnTop.kind,
            diamondOnTop.match,
            diamondOnTop.posX,
            diamondOnTop.posY,
            diamondOnTop.alpha,
            //props for diamond on top
            diamondOnBottom.kind,
            0,
            diamondOnBottom.posX,
            diamondOnBottom.posY,
            diamondOnBottom.alpha,
        ]

        this.gameState.isMoving = true;
    }
}

export const game = new Game();