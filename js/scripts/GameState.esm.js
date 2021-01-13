import { EMPTY_DIAMOND } from '../data/gameData.esm.js';
import {Diamond} from './Diamond.esm.js'

export class GameState{
    constructor(level, requiredScore, movement, gameBoard, kindsOfDiamonds, highestScore){

        const _level = level;
        const _requiredScore = requiredScore;
        const _gameBoard = gameBoard.map(({posX, posY, row, column, kind}) => new Diamond(posX, posY, row, column, kind));
        const _highestScore = highestScore;
        this._movement = movement;

        this.getGameBoard = () => _gameBoard;
        this.getLevel = () => _level;
        this.getRequiredScore = () => _requiredScore;

        this.getMovement = () => this._movement;
        this.increaseMovement = () => this._movement++;
        this.decreaseMovement = () => this._movement--;

        this.recordIsBroken = () => _highestScore < this.#currentScore;
        this.getHighestScore = () => _highestScore;

        this.playerHasWon = () => this.#currentScore >= _requiredScore;

        this.clickedDiamonds = 0;//number of diamonds clicked (max. 2)
        this.kindsOfDiamond = kindsOfDiamonds;
    }

    #pointsMultipler = 1.5;
    #currentScore = 0;
    #playerWon = false;
    #isMoving = false;
    #isSwapping = false;
    #isActive = true;

    //score
    get currentScore(){
        return this.#currentScore;
    }

    increaseCurrentScore(points){
        this.#currentScore += Math.floor(points * this.#pointsMultipler);
    }

    //moving 
    get isMoving(){
        return this.#isMoving;
    }

    set isMoving(value){
        this.#isMoving = value;
    }

    //swapping
    get isSwapping(){
        return this.#isSwapping;
    }

    set isSwapping(value){
        this.#isSwapping = value;
    }

    //if the game is active (this value will change to false when player decides to return to levels layer)
    get isActive(){
        return this.#isActive;
    }

    set isActive(value){
        this.#isActive = value;
    }

    //game result
    get playerWon(){
        return this.#playerWon;
    }

    set playerWon(isWon){
        if(isWon){
            this.#playerWon = isWon;
        }
    }

    mixDiamonds(){

        this.getGameBoard().forEach(diamond =>{

            if(diamond.kind === EMPTY_DIAMOND) return;

            diamond.kind = Math.floor(Math.random() * this.kindsOfDiamond)

        })
    }

}