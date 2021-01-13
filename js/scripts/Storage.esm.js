
class Storage{
    constructor(){

        this.#initLocalStorage();
    }
 

    #initLocalStorage(){

        const firstLevelIsUnlocked = this.levelIsUnlocked(1);

        if(!firstLevelIsUnlocked){
            localStorage.setItem(String(1), JSON.stringify({score: 0, active: true}));
        }
    }
    
    levelIsUnlocked(level){
        const currentLevel = localStorage.getItem(String(level));

        if(!currentLevel) return false;
        
        const {active} = JSON.parse(currentLevel);

        return active;
    }

    unlockNextLevel(level){

        const nextLevel = level + 1;

        const isAlreadyUnlocked = localStorage.getItem(String(nextLevel));

        if(!!isAlreadyUnlocked) return;
        else{
            console.log(nextLevel)
            localStorage.setItem(String(nextLevel), JSON.stringify({score:0, active:true}));
        }
    }

    setNewRecord(level, score){

        localStorage.setItem(String(level), JSON.stringify({score: score, active: true}))

    }

    getHighestScore(level){

        const currentLevel = localStorage.getItem(String(level));

        if(!currentLevel) return 0;
        else{

            const {score} = JSON.parse(currentLevel);

            return score;
        }

    }
}

export  const storage = new Storage();