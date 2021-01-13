import { animations } from './Animations.esm.js';
import {BindToHtml} from './BindToHtml.esm.js';
import { media } from './Media.esm.js';
import { HIDDEN_LAYER, visibilityOfLayer } from './VisibilityOfLayer.esm.js'

export const SETTINGS_LAYER_ID = 'js-settings-layer';
export const SETTINGS_CONTAINER_ID = 'js-settings-container';
const EXIT_BUTTON_ID = 'js-colse-settings';

//game sound
const GAME_SOUND_BAR_ID = 'js-game-sound-bar';
const GAME_SOUND_ICON_ID = '';

//music
const MUSIC_BAR_ID = 'js-music-bar';
const MUSIC_ICON_ID = '';

class Settings extends BindToHtml{
    constructor(){
        super(SETTINGS_LAYER_ID);

        this.barsTypes = {
            music: 'music',
            swapSound: 'swapSound',
        }

        this.#initSettings();
    }

    #initSettings(){
        this.#handleSettignsBar(GAME_SOUND_BAR_ID, this.barsTypes.swapSound);
        this.#handleSettignsBar(MUSIC_BAR_ID , this.barsTypes.music);
        this.#handleExitButton();
    }

    #handleSettignsBar( barId, type){
        const bar = this.bindToHtmlById(barId);
        bar.addEventListener('change', (event)=> this.#changeVolume(event, type))
    }

    #handleExitButton(){
        const button = this.bindToHtmlById(EXIT_BUTTON_ID);

        button.addEventListener('click', () =>{
            animations.outputAnimation(SETTINGS_LAYER_ID, SETTINGS_CONTAINER_ID);

            setTimeout(()=>{
                visibilityOfLayer.changeVisibilityOfLayer(this.layer, HIDDEN_LAYER);
            }, animations.animationDelay)
        })
    }

    #changeVolume = (event, type) =>{

        const volume = event.target.value / 100;

        if(type === this.barsTypes.swapSound){
            media.changeSwapSoundVolume(volume);
        }else if(type === this.barsTypes.music){
            media.changeMusicVolume(volume);
        }

    }
}

export const settings = new Settings();