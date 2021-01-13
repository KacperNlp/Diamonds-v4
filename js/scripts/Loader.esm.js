
class Loader{

    loadAudi(audioUrl){
        const audio = new Audio();
        audio.src = audioUrl;
        return audio;
    }

}

export const loader = new Loader();