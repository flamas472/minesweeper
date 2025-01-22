"use client"
import Tile from "@/app/ui/tiles";
// import { tileValue } from "@/app/ui/tile";
import { position, gameBoard, playBoard, play, countAllFlags, playerAction, gameState} from "@/app/lib/game";
import { useState } from "react";
import { useStopwatch } from "react-timer-hook"
import { DigitalDisplay, MinesweeperEmojiButton } from "@/app/ui/boardHeader";



export default function Board({columns, rows, mines}: {columns: number, rows: number, mines: number}) {
    
    const emptyMineGrid: number[][] = Array(rows).fill(Array(columns).fill(0));
    const [mineGrid, setMineGrid] = useState(emptyMineGrid);
    const [[playGrid, gameState], setPlayState] = useState([playBoard(columns, rows), ""]);
    const {
        totalSeconds,
        start,
        pause,
        reset
    } = useStopwatch({autoStart: false})

    function handleRestart() {
        const newPlayGrid: playerAction[][] = playBoard(columns, rows);
        const newGameState: gameState = "";
        setPlayState([newPlayGrid, newGameState]);
        // no need to update the mineGrid as it will be done with the first play of the next game
        
        reset(new Date(), false);
    }
    
    function handleClick(pos: position) {
        let currentMineGrid: number[][] = mineGrid;
        let currentGameState: string = gameState;
        let currentPlayGrid: playerAction[][] = playGrid;

        if(currentGameState === "") {
            // If the game hasn't started yet, then start it
            currentMineGrid = gameBoard(columns, rows, mines, pos);
            setMineGrid(currentMineGrid);
            start();
        } else if(currentGameState === "win" || currentGameState === "lose") {
            // if the game has already ended, return without effect
            return;
        }
        // at this point the game is clearly still going on so proceed to update the state
        [currentPlayGrid, currentGameState] = play("open", pos, playGrid, currentMineGrid);
        setPlayState([currentPlayGrid, currentGameState]);
        if(currentGameState === "win" || currentGameState === "lose") {
            pause();
        }
    }

    function handleRightClick(pos: position) {
        // the flag play doesn´t update the game state (it doesn't start the stopwatch either)
        const [newPlayGrid] = play("flag", pos, playGrid, mineGrid);
        setPlayState([newPlayGrid, gameState]);        
    }
    
    return(
        
        <div id="game-board" className="p-1.5 flex items-center justify-center flex-col bg-gray-300 border-[2.5px] flex-wrap border-t-gray-200 border-r-gray-500 border-b-gray-500 border-l-gray-200">

            <div id="game-board-header" className="w-full p-0 flex justify-between items-center flex-row bg-gray-300 border-[2.5px] border-t-gray-500 border-r-gray-200 border-b-gray-200 border-l-gray-500">

                <DigitalDisplay value={mines - countAllFlags(playGrid)}/>

                <MinesweeperEmojiButton
                    gameResult={gameState}
                    onClick={handleRestart}/>

                <DigitalDisplay value={totalSeconds}/>

            </div>
            
            <div id="play-board" className="flex justify-center items-center flex-col gap-0 max-w-min border-[2.5px] border-t-gray-500 border-r-gray-200 border-b-gray-200 border-l-gray-500">
                
                {
                    mineGrid.map(
                        (row, y) => (
                            <div key={y} className="flex justify-center items-center flex-row gap-0 max-w-min">
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