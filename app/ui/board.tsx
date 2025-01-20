"use client"
import Tile from "@/app/ui/tiles";
// import { tileValue } from "@/app/ui/tile";
import { position, playerAction, gameState, gameBoard, playBoard, play} from "@/app/lib/gameboard";
import { useState } from "react";


export default function Board({columns, rows, mines}: {columns: number, rows: number, mines: number}) {
    
    // const mineGrid: number[][] = gameBoard(columns, rows, mines);
    const [mineGrid, setMineGrid] = useState(gameBoard(columns, rows, mines));
    const [[playGrid, gameState], setPlayGrid] = useState([playBoard(columns, rows), ""]);

    function handleClick(pos: position) {
        setPlayGrid(play("open", pos, playGrid, mineGrid));
    }
    function handleRightClick(pos: position) {
        setPlayGrid(play("flag", pos, playGrid, mineGrid));

    }

    return(
        <div className="flex justify-center items-center flex-col gap-0">
            
            {
                mineGrid.map(
                    (row, y) => (
                        <div key={y} className="flex justify-center items-center flex-row gap-0 ">
                            {
                                row.map(
                                    (tileValue, x) => (
                                        <Tile
                                            value={String(tileValue)}
                                            tilePlay={playGrid[y][x]}
                                            onClick={
                                                () => {
                                                    handleClick({x: x, y: y});
                                                }
                                            }
                                            onRightClick={
                                                () => {
                                                    handleRightClick({x: x, y: y});
                                                }
                                            }
                                            key={x}
                                        />
                                    )
                                )
                            }
                        </div>
                    )
                )
            }
        </div>
    );
}