
// export type tileValue = "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"mine"|"wrong-mine"|"flag"|"question-mark";

// Tile({2}) returns a JSX component wich represents a tile, hidden or opened.
export default function Tile({value, isHidden = true, isFlagged = false}: {value: string, isHidden: boolean, isFlagged: boolean}) {

    if(isHidden) {
        if(isFlagged) {
            return <HiddenTile isFlagged={true}/>
        }
        return <HiddenTile isFlagged={false}/>
        
    } else {
        return <OpenedTile value={value}/>
    }
}

function HiddenTile({isFlagged}: {isFlagged: boolean}) {
    let tileContent = "";

    if(isFlagged) {
        tileContent = "🚩";
    }


    return(
        <div className={"bg-gray-300 w-4 h-4 flex justify-center items-center border-[2.5px] border-t-gray-200 border-r-gray-500 border-b-gray-500 border-l-gray-200 text-xs"}>
            <p>
                {tileContent}
            </p>
        </div>
    )
}

function OpenedTile({value}: {value: string}) {
    let tileContent: string = "";
    let className: string = "";

    switch(value) {
        case "0":
            tileContent = "";
        break;
        case "1":
            tileContent = "1";
            className = " text-blue-700 font-black";
        break;
        case "2":
            tileContent = "2";
            className = " text-green-700 font-black";
        break;
        case "3":
            tileContent = "3";
            className = " text-red-600 font-black";
        break;
        case "4":
            tileContent = "4";
            className = " text-indigo-950 font-black";
        break;
        case "5":
            tileContent = "5";
            className = " text-rose-900 font-black";
        break;
        case "6":
            tileContent = "6";
            className = " text-cyan-600 font-black";
        break;
        break;
        case "7":
            tileContent = "7";
            className = " text-black font-black";
        break;
        case "8":
            tileContent = "8";
            className = " text-gray-600 font-black";
        break;
        case "9":
            tileContent = "💣";
            className = " text-gray-600 font-black";
        break;
        case "mine":
            // as 8 is the limit of adjacent mines, 9 represents a mine in the tile
            tileContent = "💣";
        break;
        default:
            tileContent = value;//change to "" later
    }
    
    return(
        <div className={"bg-gray-300 w-4 h-4 flex justify-center items-center border-[0.5px] border-gray-500 text-xs" + className}>
            <p>
                {tileContent}
            </p>
        </div>
    )
}