"use client"
import Link from "next/link";
import { useState } from "react";


export default function Home() {
  const [columns, setColumns] = useState(9);
  const [rows, setRows] = useState(9);
  const [mines, setMines] = useState(10);


  return (
    <div>
      <p>{"welcome to flamas472's minesweeper project"}</p>

      <div className="flex flex-col border-[0.5px] border-red-500">
        <CustomGameImput name="columns: " placeholder="9" onChange={setColumns}/>
        <CustomGameImput name="rows: " placeholder="9" onChange={setRows}/>
        <CustomGameImput name="mines: " placeholder="10" onChange={setMines}/>
        <Link
          href={`/play/${columns}/${rows}/${mines}`}
        >
          new game
        </Link>
      </div>
    </div>
  );
}

function CustomGameImput({name, placeholder, onChange}: {name: string, placeholder: string, handleChange: () => void}) {

  return (
    <div className="flex flex-row">
      <p>{name}</p>
      <input
      className=" text-black"
        type="number"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
