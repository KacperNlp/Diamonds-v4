import {BindToHtml} from './BindToHtml.esm.js';
import {gameLevels} from '../data/gameData.esm.js';
import {tagGenerator, LIST_OF_TAGS} from './TagGenerator.esm.js';
import {HIDDEN_LAYER, visibilityOfLayer, VISIBLE_LAYER} from './VisibilityOfLayer.esm.js'
import {game} from './Game.esm.js';
import { mainMenu } from './MainMenu.esm.js';
import { storage } from './Storage.esm.js';
import { settings, SETTINGS_CONTAINER_ID, SETTINGS_LAYER_ID } from './Settings.esm.js';
import { animations } from './Animations.esm.js';


const LEVELS_LAYER_ID = 'js-levels-layer';
const LEVELS_CONTAINER_ID = 'js-levels-container';
const LEVEL_BUTTON_CLASS = 'levels__button'

const RETURN_BUTTON_ID = 'js-levels-layer-return-button';
const SETTINGS_BUTTON_ID = 'js-levels-layer-settings-button';
 
class LevelsLayer extends BindToHtml{
    constructor(){

        super(LEVELS_LAYER_ID);

        this.lockedUnlockedClass = {
            locked: 'locked',
            unlocked: 'unlocked',
        }

        this.buttonIconsClass = {
            unlockedIcon: 'fa-lock-open',
            lockedIcon:'fa-lock',
            globalIconClass: 'fas',
        }
    }

    initLevelsLayer(){
        this.#initLevelsBoard();
        this.#returnButtonHandle();
        this.#settingsButtonHandle();
    }

    #initLevelsBoard(){
        const levelsBoard = this.bindToHtmlById(LEVELS_CONTAINER_ID);

        //clear levels board
        while(levelsBoard.firstChild){
            levelsBoard.removeChild(levelsBoard.lastChild);
        }

        this.#generateLevelButtons(levelsBoard);
    }

    #generateLevelButtons(levelsBoard){

        //generate and append buttons to levels board
        for(let i = 0; i < gameLevels.length; i++){

            const {level} = gameLevels[i];
            const isUnlocked = storage.levelIsUnlocked(level);
            const {locked, unlocked} = this.lockedUnlockedClass;
            const {lockedIcon, unlockedIcon, globalIconClass} = this.buttonIconsClass;

            const levelButton = tagGenerator.createTag(LIST_OF_TAGS.button)
            const span = tagGenerator.createTag(LIST_OF_TAGS.span)

            levelButton.textContent = level;

            levelButton.classList.add(LEVEL_BUTTON_CLASS);
            span.classList.add(globalIconClass);

            if(isUnlocked){

                span.classList.add(unlockedIcon);
                levelButton.classList.add(unlocked);
                this.#buttonHandle(levelButton, level);

            }else{

                span.classList.add(lockedIcon);
                levelButton.classList.add(locked);

            }


            levelButton.appendChild(span);
            levelsBoard.appendChild(levelButton);
        }
    }

    #buttonHandle(button, level){
        button.addEventListener('click', ()=>{
            visibilityOfLayer.changeVisibilityOfLayer(this.layer, HIDDEN_LAYER);
            visibilityOfLayer.changeVisibilityOfLayer(game.layer, VISIBLE_LAYER);
            game.startNewGame(level);
        })
    }

    //return to main menu
    #returnButtonHandle(){
        const button = this.bindToHtmlById(RETURN_BUTTON_ID);

        button.addEventListener('click', ()=>{
            
            visibilityOfLayer.changeVisibilityOfLayer(mainMenu.layer, VISIBLE_LAYER);
            visibilityOfLayer.changeVisibilityOfLayer(this.layer, HIDDEN_LAYER);
            
        })
    }

    #settingsButtonHandle(){
        const button = this.bindToHtmlById(SETTINGS_BUTTON_ID);

        button.addEventListener('click', ()=>{
            animations.inputAnimation(SETTINGS_LAYER_ID, SETTINGS_CONTAINER_ID);
            visibilityOfLayer.changeVisibilityOfLayer(settings.layer, VISIBLE_LAYER);
        })
    }
}

export const levelsLayer = new LevelsLayer();