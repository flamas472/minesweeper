"use client"
import Tile from "@/app/ui/tiles";
// import { tileValue } from "@/app/ui/tile";
import { position, playerAction, gameState, gameBoard, playBoard, play} from "@/app/lib/gameboard";
import { useState } from "react";

 

export default function Board({columns, rows, mines}: {columns: number, rows: number, mines: number}) {
    
    const grid: number[][] = gameBoard(columns, rows, mines);
    const [playGrid, setPlayGrid] = useState(playBoard(columns, rows));


    return(
        <div className="flex justify-center items-center flex-col gap-0">
            {
                grid.map(
                    (row, y) => (
                        <div key={y} className="flex justify-center items-center flex-row gap-0 ">
                            {
                                row.map(
                                    (tileValue, x) => (
                                        <Tile
                                            value={String(tileValue)}
                                            tilePlay="open"
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