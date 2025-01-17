
export type tileValue = "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"mine"|"wrong-mine"|"flag"|"question-mark";

export default function Tile({value}: {value: string} ) {
    let tileContent: string = "";
    let className: string = "bg-gray-300 w-8 h-8 flex justify-center items-center";

    switch(value) {
        case "0":
            tileContent = "";
        break;
        case "1":
            tileContent = "1";
            className = className + " text-blue-700 font-black";
        break;
        case "2":
            tileContent = "2";
            className = className + " text-green-700 font-black";
        break;
        case "3":
            tileContent = "3";
            className = className + " text-red-600 font-black";
        break;
        case "4":
            tileContent = "4";
            className = className + " text-indigo-950 font-black";
        break;
        case "5":
            tileContent = "5";
            className = className + " text-rose-900 font-black";
        break;
        case "6":
            tileContent = "6";
            className = className + " text-cyan-600 font-black";
        break;
        break;
        case "7":
            tileContent = "7";
            className = className + " text-black font-black";
        break;
        case "8":
            tileContent = "8";
            className = className + " text-gray-600 font-black";
        break;
        case "bomb":
            // as 8 is the limit of adjacent mines, 9 represents a mine in the tile
            tileContent = "💣";
        break;
        default:
            tileContent = value;//change to "" later
    }

    return (
        <div className={className}>
            <p>
                {tileContent}
            </p>
        </div>
    );
}