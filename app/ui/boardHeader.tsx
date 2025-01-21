"use client"
import { gameState } from "@/app/lib/game";
export function DigitalDisplay({value}: {value: number}) {
    return (
        <div className="select-none">
            {value}
        </div>
    );
}

export function MinesweeperEmojiButton({gameResult, onClick}: {gameResult: gameState, onClick: ()=>void}) {
    let emoji: string = ""
    switch(gameResult) {
        case "":
            emoji = "🙂";
        break;
        case "play":
            emoji = "🙂";
        break;
        case "win":
            emoji = "😎";
        break;
        case "lose":
                emoji = "😵";
        break;
    }

    return(
        <div
        className="select-none"
        onClick={onClick}
        >
            {emoji}
        </div>
    );
}