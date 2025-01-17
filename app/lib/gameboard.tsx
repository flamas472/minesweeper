
export default function gameBoard(columns: number, rows: number)  {
    const grid: number[][] = [];

    for(let r = 0; r < rows;r++) {
        grid.push([]);
        for(let c = 0; c < columns; c++) {
            grid[r].push(c)
        }
    }

    return grid;
}