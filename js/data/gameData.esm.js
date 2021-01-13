

export const DIAMOND_WIDTH = 48;
export const DIAMOND_HEIGHT = 46;
export const NUMBER_OF_ROWS = 9;
export const NUMBER_OF_COLUMNS = 8;
export const EMPTY_DIAMOND = 20;
export const DIAMOND_KINDS = 6;

export const NUMBER_OF_DIAMONDS = NUMBER_OF_COLUMNS * NUMBER_OF_ROWS;

const generateGameBoard = (numberOfKinds)=>{

    const diamondsBoard = [];
    let numberOfRow = 0;

    for(let i = 0; i < NUMBER_OF_DIAMONDS; i++){

        const diamond = {};


        const column = i % NUMBER_OF_COLUMNS;

        if(i < NUMBER_OF_COLUMNS){

            diamond.kind = EMPTY_DIAMOND;

        }else{

            if(column){

                diamond.row = numberOfRow;
                diamond.column = column;
                diamond.posX = column * DIAMOND_WIDTH;
                diamond.posY = numberOfRow * DIAMOND_HEIGHT;
    
            }else{
    
                numberOfRow++;
    
                diamond.row = numberOfRow;
                diamond.column = 0;
                diamond.posX = 0;
                diamond.posY = numberOfRow * DIAMOND_HEIGHT;
    
            }
    
            diamond.kind = Math.floor(Math.random() * numberOfKinds)
        }

        diamondsBoard.push(diamond);
    }
    return diamondsBoard;
}

export const gameLevels = [
    {
        level: 1,
        kindOfDiamonds: 5,
        playerMovement: 30,
        requiredScore: 5000,
        gameBoard: generateGameBoard,
    },{
        level: 2,
        kindOfDiamonds: 5,
        playerMovement: 35,
        requiredScore: 8000,
        gameBoard: generateGameBoard,
    },{
        level: 3,
        kindOfDiamonds: 5,
        playerMovement: 40,
        requiredScore: 12000,
        gameBoard: generateGameBoard,
    },{
        level: 4,
        kindOfDiamonds: 6,
        playerMovement: 45,
        requiredScore: 15000,
        gameBoard: generateGameBoard,
    },{
        level: 5,
        kindOfDiamonds: 6,
        playerMovement: 50,
        requiredScore: 20000,
        gameBoard: generateGameBoard,
    }
]
