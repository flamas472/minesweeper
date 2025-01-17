
export default function gameBoard(columns: number, rows: number)  {
    const grid: number[] = [];

    for(let i = 0; i<columns*rows;i++) {
        grid.push(1)
    }

    return grid;
}