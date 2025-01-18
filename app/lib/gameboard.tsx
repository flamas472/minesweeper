

type position = {
    x: number,
    y: number
}


export default function gameBoard(columns: number, rows: number)  {
    // declare and initialize the game grid and the mine positions as empty arrays
    const mines: number = 10;
    const grid: number[][] = [];
    const minePositions: position[] = [];

    // initialize the grid content according to the number of rows and columns
    for(let r = 0; r < rows;r++) {
        grid.push([]);
        for(let c = 0; c < columns; c++) {
            grid[r].push(0)
        }
    }

    // fill grid with mines
    for(let m = 0; m < mines; m++) {
        minePositions.push(newMinePosition(columns, rows, minePositions));
        // 9 represents a mine
        grid[minePositions[m].x][minePositions[m].y] = 9;
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
                    if(grid[pos.x][pos.y] < 9) {
                        // increment the counter (value of the tile)
                        grid[pos.x][pos.y]++;
                    }
                }
            );
        }
    );
    


    return grid;
}


function newMinePosition(maxX: number, maxY: number, blackList: position[]) {
    
    let randomPos: position = randomPosition(maxX, maxY);

    while(includesPosition(blackList, randomPos)) {
        randomPos = randomPosition(maxX, maxY);
    }

    return randomPos;
}

function randomPosition(maxX: number, maxY: number) {
    const randomPos: position = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    }
    return randomPos;
}

function includesPosition(list: position[], pos: position) {

    for(let i = 0; i < list.length; i++) {
        if(list[i].x === pos.x && list[i].y === pos.y) {
            return true;
        }
    }
    return false;
}

function adjacentPositions(pos: position, columns: number, rows:  number) {
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