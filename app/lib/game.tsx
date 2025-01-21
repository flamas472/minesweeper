"use client"

export type position = {
    x: number,
    y: number
}

export type playerAction = "----"|"open"|"flag";

// "" means unstarted game
export type gameState = ""|"play"|"win"|"lose";

// gameBoard(2) returns a game grid (2 dimensional array) filled with all the game necessary information: numbers 0 to 8 for nearby mines on safe tiles and 9 for mine tiles
export function gameBoard(columns: number, rows: number, mines: number): number[][] {
    // declare and initialize the game grid and the mine positions as empty arrays
    //const mines: number = 10;
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
        mineGrid[minePositions[m].y][minePositions[m].x] = 9;
    }

    // fill tiles with their amount of nearby mines
    minePositions.forEach(
        // for each mine
        (minePos) => {
            // iterate it}ss adjacent tiles
            getAdjacentPositions(minePos, columns, rows).forEach(
                // for each adjacent tile
                (pos) => {
                    // if it's not a mine
                    if(mineGrid[pos.y][pos.x] < 9) {
                        // increment the counter (value of the tile)
                        mineGrid[pos.y][pos.x]++;
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
            playGrid[r].push("----");
        }
    }
    return playGrid;
}

export function play(action: playerAction, pos: position, playGrid: playerAction[][], mineGrid: number[][]): [playerAction[][], gameState] {
    let result: gameState = "play";
    const tileState: playerAction = playGrid[pos.y][pos.x];
    const tileValue: number = mineGrid[pos.y][pos.x];
    let newPlayGrid: playerAction[][] = playGrid.slice();

    switch(action) {
        case "flag":
            if (tileState === "----"){
                newPlayGrid[pos.y][pos.x] = "flag";
            } else if(tileState === "flag") {
                newPlayGrid[pos.y][pos.x] = "----";
            }
        break;
        case "open":
            if (tileState  === "----") {
                newPlayGrid[pos.y][pos.x] = "open";
                if(tileValue === 9) {
                    // If the opened tile is a mine, set teh game result to "lose"
                    result = "lose";
                } else {
                    // if it's not a mine, then it´s safe.
                    // 1st check if it has 0 nearby tiles and open them if so.
                    if(tileValue === 0) {
                        [newPlayGrid, result] = chord(pos, playGrid, mineGrid);
                    }

                    // if it´s safe, check win condition.
                    result = checkWinCondition(playGrid, mineGrid);
                }
            } else if(tileState === "open") {
                // TODO Add Chord here
                [newPlayGrid, result] = chord(pos, playGrid, mineGrid);
            }
        break;
    }

    
    return [newPlayGrid, result];
}

function chord(pos: position, playGrid: playerAction[][], mineGrid: number[][]): [playerAction[][], gameState] {
    const columns: number = playGrid[0].length;
    const rows: number = playGrid.length;
    const adjPositions: position[] = getAdjacentPositions(pos, columns, rows);
    let newPlayGrid: playerAction[][] = playGrid.slice();
    let result: gameState = "play";
    // const tilePlay: playerAction = playGrid[pos.y][pos.x];
    const tileValue: number = mineGrid[pos.y][pos.x];
    const adjacentFlags: number = countAdjacentFlags(pos, playGrid);

    // if(tileValue === 0 || adjacent)


    adjPositions.forEach(
        (p) => {
            const targetTilePlay: playerAction = playGrid[p.y][p.x]
            // open adjacent tiles if one of the next conditions are met:
            // 1) the chord originated on a safe tile with 0 adjacent mines. In this case, open flags too, as they are a safe tile anyways.
            // 2) the chord originated on a safe tile with the same number of adjacent mines and flags
            if((targetTilePlay !== "open" && tileValue === 0) || (targetTilePlay === "----" && tileValue === adjacentFlags)) {
                // even if the play function may call chord again, both functions work with the last
                [newPlayGrid, result] = play("open", p, newPlayGrid, mineGrid);
            }
        }
    );

    return [newPlayGrid, result]
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
    let includes: boolean = false;

    list.forEach(
        (p) => {
            if(p.x === pos.x && p.y === pos.y) {
                includes = true;
                return;
            }
        }
    );
    return includes;
}

function getAdjacentPositions(pos: position, columns: number, rows:  number): position[] {
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

function checkWinCondition(playGrid: playerAction[][], mineGrid: number[][]): gameState {
    let result: gameState = "win";
    mineGrid.forEach(
        (row, y) => {
            row.forEach(
                (tileValue, x) => {
                    if(tileValue < 9 && playGrid[y][x] !== "open") {
                        //If there's a safe tile not open return "" (keep playing)
                        result = "play";
                    }
                }
            );
        }
    );
    return result;
}

function countAdjacentFlags(pos: position, playGrid: playerAction[][]): number {
    const columns: number = playGrid[0].length;
    const rows: number = playGrid.length;
    const adjPos: position[] = getAdjacentPositions(pos, columns, rows);
    let adjacentFlags: number = 0;
    adjPos.forEach(
        (pos) => {
            const tilePlay: playerAction = playGrid[pos.y][pos.x];
            if(tilePlay === "flag") {
                adjacentFlags++;
            }
        }
    );

    return adjacentFlags;
}

export function countAllFlags(playGrid: playerAction[][]): number {
    let flags: number = 0

    playGrid.forEach(
        (row) => {
            row.forEach(
                (tilePlay) => {
                    if(tilePlay === "flag") {
                        flags++;
                    }
                }
            );
        }
    );

    return flags;
}