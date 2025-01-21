"use client"
import Tile from "@/app/ui/tiles";
// import { tileValue } from "@/app/ui/tile";
import { position, gameBoard, playBoard, play, countAllFlags} from "@/app/lib/game";
import { useState } from "react";
import { useStopwatch } from "react-timer-hook"
import { DigitalDisplay, MinesweeperEmojiButton } from "@/app/ui/boardHeader";


export default function Board({columns, rows, mines}: {columns: number, rows: number, mines: number}) {
    
    // const mineGrid: number[][] = gameBoard(columns, rows, mines);
    const [mineGrid, setMineGrid] = useState(gameBoard(columns, rows, mines));
    const [[playGrid, gameResult], setPlayState] = useState([playBoard(columns, rows), ""]);
    const {
        totalSeconds,
        start,
        pause,
        reset
    } = useStopwatch({autoStart: false})

    if(gameResult === "win"|| gameResult === "lose") {
        pause();
        alert(`you ${gameResult}!`);
        console.log(`you ${gameResult}!`)
    }

    function handleClick(pos: position) {
        if(gameResult === "") {
            start();
            setPlayState([playGrid, "play"]);
            setPlayState(play("open", pos, playGrid, mineGrid));
        }else if(gameResult === "play") {
            setPlayState(play("open", pos, playGrid, mineGrid));
        }
    }
    function handleRightClick(pos: position) {
        if(gameResult === "") {
            start();
            setPlayState([playGrid, "play"]);
            setPlayState(play("flag", pos, playGrid, mineGrid));
        }else if(gameResult === "play") {
            setPlayState(play("flag", pos, playGrid, mineGrid));
        }
    }
    function handleRestart() {
        reset();
        pause();
        setPlayState([playBoard(columns, rows), ""]);
        setMineGrid(gameBoard(columns, rows, mines));
    }

    return(
        
        <div className="p-1.5 flex justify-center items-center flex-col bg-gray-300 border-[2.5px] border-t-gray-200 border-r-gray-500 border-b-gray-500 border-l-gray-200 gap-1.5">

            <div id="game-board-header" className="p-0 flex justify-center items-center flex-row gap-5 max-h-min w-full bg-gray-300 max-w-max border-[2.5px] border-t-gray-500 border-r-gray-200 border-b-gray-200 border-l-gray-500">

                <DigitalDisplay value={mines - countAllFlags(playGrid)}/>

                <MinesweeperEmojiButton
                    gameResult={gameResult}
                    onClick={handleRestart}/>

                <DigitalDisplay value={totalSeconds}/>

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