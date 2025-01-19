import Tile from "@/app/ui/tiles";
// import { tileValue } from "@/app/ui/tile";
import {gameBoard} from "@/app/lib/gameboard";
// import { useState } from "react";

 

export default function Board({columns, rows, mines}: {columns: number, rows: number, mines: number}) {
    
    //const columns: number = 9;
    //const rows: number = 9;
    const grid: number[][] = gameBoard(columns, rows, mines);


    return(
        <div className="flex justify-center items-center flex-col gap-0">
            {
                grid.map(
                    (row, rIndex) => (
                        <div key={rIndex} className="flex justify-center items-center flex-row gap-0 ">
                            {
                                row.map(
                                    (tileValue, cIndex) => (
                                        <Tile
                                            value={String(tileValue)}
                                            isHidden={false}
                                            isFlagged={false}
                                            key={cIndex}
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