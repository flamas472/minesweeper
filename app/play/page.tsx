"use client"
import Board from "@/app/ui/board";

export default function Page() {
    return(
        <div className="flex justify-center items-center flex-col">
            New Game
            <Board columns={9} rows={9} mines={10}/>
        </div>
    );
}