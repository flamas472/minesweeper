

type position = {
    x: number,
    y: number
}

type playerAction = ""|"open"|"flag";
type gameState = ""|"win"|"loose";

// gameBoard(2) returns a game grid (2 dimensional array) filled with all the game necessary information: numbers 0 to 8 for nearby mines on safe tiles and 9 for mine tiles
export function gameBoard(columns: number, rows: number): number[][] {
    // declare and initialize the game grid and the mine positions as empty arrays
    const mines: number = 10;
    const mineGrid: number[][] = [];
    const minePositions: position[] = [];

    // initialize the grid content according to the number of rows and columns
    for(let r = 0; r < rows;r++) {
        mineGrid.push([]);
        for(let c = 0; c < columns; c++) {
            mineGrid[r].push(0)
        }
    }

    // fill grid with mines
    for(let m = 0; m < mines; m++) {
        minePositions.push(newMinePosition(columns, rows, minePositions));
        // 9 represents a mine
        mineGrid[minePositions[m].x][minePositions[m].y] = 9;
    }

    // fill tiles with their amount of nearby mines
    minePositions.forEach(
        // for each mine
        (minePos) => {
            // iterate it}ss adjacent tiles
            adjacentPositions(minePos, columns, rows).forEach(
                // for each adjacent tile
                (pos) => {
                    // if it's not a mine
                    if(mineGrid[pos.x][pos.y] < 9) {
                        // increment the counter (value of the tile)
                        mineGrid[pos.x][pos.y]++;
                    }
                }
            );
        }
    );
    


    return mineGrid;
}

// playBoard(2) returns a play grid (2 dimensional array) with all the player's plays
// the play grid will save all player's actions.
// the player can do 2 things: open or flag tiles.
// so the grid will be filled with "open" "flag" or "" (no play)
export function playBoard(columns: number, rows: number): playerAction[][] {
    const playGrid: playerAction[][] = []

    for(let r  = 0; r < rows; r++) {
        playGrid.push([]);
        for(let c = 0; c < columns; c++) {
            // empty string means no play
            playGrid[r].push("");
        }
    }
    return playGrid;
}

export function play(action: playerAction, pos: position, playGrid: playerAction[][], mineGrid: number[][]): [playerAction[][], gameState] {
    let result: gameState = "";

    playGrid[pos.x][pos.y] = action;
    // TODO CHECK THE ACTION AND CONSIDER FLAG AND UNFLAG
    if(mineGrid[pos.x][pos.y] === 9) {
        result = "loose";
    } else {
        // TODO if it's a safe tile, open adjacent tiles;
    }

    return [playGrid, result];
}

function newMinePosition(maxX: number, maxY: number, blackList: position[]): position {
    
    let randomPos: position = randomPosition(maxX, maxY);

    while(includesPosition(blackList, randomPos)) {
        randomPos = randomPosition(maxX, maxY);
    }

    return randomPos;
}

function randomPosition(maxX: number, maxY: number): position {
    const randomPos: position = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    }
    return randomPos;
}

function includesPosition(list: position[], pos: position): boolean {

    for(let i = 0; i < list.length; i++) {
        if(list[i].x === pos.x && list[i].y === pos.y) {
            return true;
        }
    }
    return false;
}

function adjacentPositions(pos: position, columns: number, rows:  number): position[] {
    const adjPos: position[] = [
        {x: pos.x, y: pos.y - 1},       //adjPos[0] = top
        {x: pos.x + 1, y: pos.y - 1},   //adjPos[1] = topright
        {x: pos.x + 1, y: pos.y},       //adjPos[2] = right
        {x: pos.x + 1, y: pos.y + 1},   //adjPos[3] = rightbottom
        {x: pos.x, y: pos.y + 1},       //adjPos[4] = bottom
        {x: pos.x - 1, y: pos.y + 1},   //adjPos[5] = bottomleft
        {x: pos.x - 1, y: pos.y},       //adjPos[6] = left
        {x: pos.x - 1, y: pos.y - 1}    //adjPos[7] = topleft
    ];

    return adjPos.filter(
        (p) => p.x >= 0 && p.x < columns && p.y >= 0 && p.y < rows
    );
}