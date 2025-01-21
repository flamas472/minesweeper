"use client"
import localFont from "next/font/local"

const digital = localFont({src: [
    {
        path: "./fonts/Lets-go-Digital-Regular.ttf.woff",
        weight: "700",
        style: "normal"
    }
]});



export function DigitalDisplay({value}: {value: number}) {

    let displayValue: string = String(value);
    const zeroesNeeded: number = 3 - displayValue.length;

    if(displayValue.length < 3) {
        for(let i = 0; i < zeroesNeeded; i++) {
            displayValue = "0" + displayValue;
        }

    }
    

    return (
        <div className={`select-none m-1 text-center bg-black ${digital.className} text-4xl leading-7 text-red-600`}>
            {displayValue}
        </div>
    );
}

export function MinesweeperEmojiButton({gameResult, onClick}: {gameResult: string, onClick: ()=>void}) {
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
        className="select-none bg-gray-300 w-7 h-7 flex justify-center items-center border-[2.5px] border-t-gray-200 border-r-gray-500 border-b-gray-500 border-l-gray-200 text-xl m-1"
        onClick={onClick}
        >
            {emoji}
        </div>
    );
}