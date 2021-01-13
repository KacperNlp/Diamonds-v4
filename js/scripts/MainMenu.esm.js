import {BindToHtml} from './BindToHtml.esm.js'
import {levelsLayer} from './LevelsLayer.esm.js'
import {HIDDEN_LAYER, visibilityOfLayer, VISIBLE_LAYER} from './VisibilityOfLayer.esm.js';
import {settings, SETTINGS_CONTAINER_ID, SETTINGS_LAYER_ID} from './Settings.esm.js';
import { media, MUSIC_FILE_SRC, SOUND_FILE_SRC } from './Media.esm.js';
import { loader } from './Loader.esm.js';
import {animations} from './Animations.esm.js';

const MAIN_MENU_LAYER_ID = 'js-main-menu';
const SETTINGS_BUTTON_ID = 'js-settings-button';
const START_GAME_BUTTON_ID = 'js-start-button';

class MainMenu extends BindToHtml{
    constructor(){
        super(MAIN_MENU_LAYER_ID);
        this.#initMenu();
    }

    #initMenu(){
        this.#handleStartGameButton();
        this.#handleSettingsButton();
        this.#initBgMusicAndSwapSound();
    }

    #handleStartGameButton(){
        const button = this.bindToHtmlById(START_GAME_BUTTON_ID);

        button.addEventListener('click', ()=>{
            visibilityOfLayer.changeVisibilityOfLayer(this.layer, HIDDEN_LAYER);
            visibilityOfLayer.changeVisibilityOfLayer(levelsLayer.layer, VISIBLE_LAYER);
            levelsLayer.initLevelsLayer();
        })
    }

    #handleSettingsButton(){
        const button = this.bindToHtmlById(SETTINGS_BUTTON_ID);

        button.addEventListener('click', ()=>{
            animations.inputAnimation(SETTINGS_LAYER_ID, SETTINGS_CONTAINER_ID);
            visibilityOfLayer.changeVisibilityOfLayer(settings.layer, VISIBLE_LAYER);
        })
    }

    #initBgMusicAndSwapSound(){
        media.backgroundMusic = loader.loadAudi(MUSIC_FILE_SRC);
        media.swapSound = loader.loadAudi(SOUND_FILE_SRC);

        media.playBackgroundMusic();
    }
}

export const mainMenu = new MainMenu();