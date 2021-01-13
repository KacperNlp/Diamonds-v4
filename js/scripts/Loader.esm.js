import {BindToHtml} from './BindToHtml.esm.js';
import { HIDDEN_LAYER, visibilityOfLayer, VISIBLE_LAYER } from './VisibilityOfLayer.esm.js';

const LOADER_CONTAINER_ID = 'js-loader';
const LOADED_ELEMENTS_CONTAINER_ID = 'js-loaded-elements';
const ELEMENTS_TO_LOAD_CONTAINER_ID = 'js-elements-to-load';

class Loader extends BindToHtml{
    constructor(){
        super(LOADER_CONTAINER_ID);
        this.#bindLoaderElements();

        this.counterOfElementsToLoad = 0;
        this.counterOfLoadedElements = 0;
    }

    #bindLoaderElements(){
        this.loadedContainer = this.bindToHtmlById(LOADED_ELEMENTS_CONTAINER_ID);
        this.toLoadContainer = this.bindToHtmlById(ELEMENTS_TO_LOAD_CONTAINER_ID);
    }

    loadSprite(imageUrl){

        visibilityOfLayer.changeVisibilityOfLayer(this.layer, VISIBLE_LAYER);
        this.counterOfElementsToLoad++;
        this.toLoadContainer.textContent = this.counterOfElementsToLoad;

        const img = new Image();
        img.src = imageUrl;
        img.addEventListener('load', this.#itemLoaded);

    }

    loadAudi(audioUrl){
        const audio = new Audio();
        audio.src = audioUrl;
        return audio;
    }

    #itemLoaded = (event) =>{

        event.target.removeEventListener(event.type, this.#itemLoaded);

        this.counterOfLoadedElements++;
        this.loadedContainer.textContent = this.counterOfLoadedElements;

        //when everything is loaded
        if(this.counterOfLoadedElements === this.counterOfElementsToLoad){
            visibilityOfLayer.changeVisibilityOfLayer(this.layer, HIDDEN_LAYER);
            this.#clearCounters();
        }

    }

    #clearCounters(){
        this.counterOfLoadedElements = 0;
        this.counterOfElementsToLoad = 0;
    }
}

export const loader = new Loader();