"use client"
import Board from "@/app/ui/board";
import { useParams } from "next/navigation";


export default function Page(){
    const {columns, rows, mines} = useParams<{
        columns: string;
        rows: string;
        mines: string;
    }>();

    return(
        <div className="flex justify-center items-center flex-col">
            New Game
            <Board columns={Number(columns)} rows={Number(rows)} mines={Number(mines)}/>
        </div>
    );
}