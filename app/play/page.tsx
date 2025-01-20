"use client"
import Board from "@/app/ui/board";

export default function Page() {
    return(
        <div className="flex justify-center items-center flex-col">
            New Game
            <Board columns={16} rows={16} mines={40}/>
        </div>
    );
}