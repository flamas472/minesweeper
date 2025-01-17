import Tile from "@/app/ui/tiles";
// import { tileValue } from "@/app/ui/tile";
import gameBoard from "@/app/lib/gameboard";
// import { useState } from "react";

 

export default function Board() {
    
    const columns: number = 9;
    const rows: number = 9;
    const grid: number[][] = gameBoard(columns, rows);


    return(
        <div className="flex justify-center items-center flex-col gap-0">
            {
                grid.map(
                    (row, rIndex) => (
                        <div key={rIndex} className="flex justify-center items-center flex-row gap-0 ">
                            {
                                row.map(
                                    (tileValue, cIndex) => (
                                        <Tile value={String(tileValue)} key={cIndex}/>
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