import { animations } from './Animations.esm.js';
import {BindToHtml} from './BindToHtml.esm.js';
import { game } from './Game.esm.js';
import { levelsLayer } from './LevelsLayer.esm.js';
import { HIDDEN_LAYER, visibilityOfLayer, VISIBLE_LAYER } from './VisibilityOfLayer.esm.js';

export const MESSAGE_LAYER_ID = 'js-message-layer';
export const MESSAGE_CONTAINER_ID = 'js-message';
const HEADER_CONTAINER_ID = 'js-header-txt';
const NEW_RECORD_CONTAINER_ID = 'js-new-record';
const SCORE_CONTAINER_ID = 'js-message-score';
const EXIT_BUTTON_ID = 'js-colse-message';

class Message extends BindToHtml{
    constructor(){
        super(MESSAGE_LAYER_ID);

        this.classForMessage = {
            won: 'message__result--won',
            lost: 'message__result--lost',
        }

        this.headerTexts = {
            won: 'You won!',
            lost: 'You lost...'
        }

        this.newRecordMessage = 'You broke the record, congratulations!';
    }

    initMessage(result, score, isNewRecord){
        this.#initText(result, score, isNewRecord);
        this.#exitButtonHandle();
    }

    #initText(result, score, isNewRecord){

        const headerTxt = this.bindToHtmlById(HEADER_CONTAINER_ID);
        const scoreContainer = this.bindToHtmlById(SCORE_CONTAINER_ID);
        const newRecordContainer = this.bindToHtmlById(NEW_RECORD_CONTAINER_ID);

        headerTxt.textContent = '';
        scoreContainer.textContent = '';
        newRecordContainer.textContent = '';

        headerTxt.classList.remove(this.classForMessage.won)
        headerTxt.classList.remove(this.classForMessage.lost)

        //won
        if(result){

            headerTxt.classList.add(this.classForMessage.won)

            headerTxt.textContent = this.headerTexts.won;
            scoreContainer.textContent = score;

            if(isNewRecord){
                newRecordContainer.textContent = this.newRecordMessage;
            }

        }else{//lost

            headerTxt.classList.add(this.classForMessage.lost)

            if(isNewRecord){
                newRecordContainer.textContent = this.newRecordMessage;
            }

            headerTxt.textContent = this.headerTexts.lost;
            scoreContainer.textContent = score;

        }
    }

    #exitButtonHandle(){

        const button = this.bindToHtmlById(EXIT_BUTTON_ID);
        button.addEventListener('click', ()=>{

            animations.outputAnimation(MESSAGE_LAYER_ID, MESSAGE_CONTAINER_ID);

            setTimeout(()=>{

                visibilityOfLayer.changeVisibilityOfLayer(levelsLayer.layer, VISIBLE_LAYER);
                visibilityOfLayer.changeVisibilityOfLayer(game.layer, HIDDEN_LAYER);
                visibilityOfLayer.changeVisibilityOfLayer(this.layer, HIDDEN_LAYER);

                levelsLayer.initLevelsLayer();

            }, animations.animationDelay)

        })

    }

}

export const message = new Message();