"use client"
export function DigitalDisplay({value}: {value: number}) {
    return (
        <div className="select-none m-1">
            {value}
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