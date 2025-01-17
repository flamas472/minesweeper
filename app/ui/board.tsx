import Tile from "@/app/ui/tile";
// import { tileValue } from "@/app/ui/tile";
import gameBoard from "@/app/lib/gameboard";
// import { useState } from "react";

 

export default function Board() {
    
    const columns: number = 9;
    const rows: number = 9;
    const grid: number[] = gameBoard(columns, rows);


    return(
        <div className={`grid gap-0 grid-cols-[repeat(${columns},minmax(0,1fr))] grid-rows-[repeat(${rows},minmax(0,1fr))] w-fit`}>
            {
                grid.map((value, index) => {
                    return <Tile value={String(value)} key={index}/>
                })
            }
        </div>
    );
}