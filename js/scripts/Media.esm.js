

export const MUSIC_FILE_SRC = '/assets/sounds/Calvin Harris - josh pan (music 1).mp3';
export const SOUND_FILE_SRC = '/assets/sounds/mixkit-bubbly-achievement-tone-3193.wav';

class Media{
    constructor(){
        this.diamondSprite = null;
    }

    #musicVolume = 0.3;
    #swapSoundVolume = 0.3;
    #allowedMusic = true;
    #allowedSwapSound = true;

    #backgroundMusic = null;
    #swapSound = null;

    changeSwapSoundVolume(volume){
        this.#swapSoundVolume = volume;
        this.#swapSound.volume = volume;
    }

    changeMusicVolume(volume){
        this.#musicVolume = volume;
        this.#backgroundMusic.volume = volume;
    }

    //music

    set backgroundMusic(music){
        this.#backgroundMusic = music;
        this.#backgroundMusic.volume = this.#musicVolume;
    }

    toggleMusicOnOff(){

        if(this.#allowedMusic){
            this.#allowedMusic = false;
            this.pauseBackgroundMusice();
        }else{
            this.#allowedMusic = true;
            this.playBackgroundMusic();
        }

    }

    playBackgroundMusic(){

        if(!this.#allowedMusic) return;

        this.#backgroundMusic.loop = true;
        if(this.#backgroundMusic) this.#backgroundMusic.play();

    }

    pauseBackgroundMusice(){
        this.#backgroundMusic.pause();
    }

    //game sound -swap sound

    set swapSound(sound){
        this.#swapSound = sound;
        this.#swapSound.volume = this.#swapSoundVolume;
    }

    playSwapSound(){
        if(!this.#swapSound) return;
        this.#swapSound.play();
    }

    toggleSwapSound(){

        if(this.#allowedSwapSound){
             this.#allowedSwapSound = false;
        }else{
            this.#allowedSwapSound = true;
        }
    }
}

export const media = new Media();