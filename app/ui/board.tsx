"use client"
import Tile from "@/app/ui/tiles";
// import { tileValue } from "@/app/ui/tile";
import { position, playerAction, gameState, gameBoard, playBoard, play} from "@/app/lib/gameboard";
import { useState } from "react";


export default function Board({columns, rows, mines}: {columns: number, rows: number, mines: number}) {
    
    // const mineGrid: number[][] = gameBoard(columns, rows, mines);
    const [mineGrid, setMineGrid] = useState(gameBoard(columns, rows, mines));
    const [[playGrid, gameResult], setPlayGrid] = useState([playBoard(columns, rows), "play"]);
    
    if(gameResult !== "") {
        console.log(`you ${gameResult}!`)
    }

    function handleClick(pos: position) {
        setPlayGrid(play("open", pos, playGrid, mineGrid));
    }
    function handleRightClick(pos: position) {
        setPlayGrid(play("flag", pos, playGrid, mineGrid));
    }

    return(
        
        <div className="p-1.5 flex justify-center items-center flex-col bg-gray-300 border-[2.5px] border-t-gray-200 border-r-gray-500 border-b-gray-500 border-l-gray-200 gap-1.5">

            <div id="game-board-header" className="p-0 flex justify-center items-center flex-row max-h-min w-full bg-gray-300 max-w-max border-[2.5px] border-t-gray-500 border-r-gray-200 border-b-gray-200 border-l-gray-500">
                GAME INFO HERE
            </div>
            
            <div id="game-board" className="flex justify-center items-center flex-col gap-0 max-h-min max-w-min border-[2.5px] border-t-gray-500 border-r-gray-200 border-b-gray-200 border-l-gray-500">
                
                {
                    mineGrid.map(
                        (row, y) => (
                            <div key={y} className="flex justify-center items-center flex-row gap-0 max-h-min max-w-min">
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
        </div>
        
    );
}