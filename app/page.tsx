import Link from "next/link";


export default function Home() {
  return (
    <div>
      <p>{"welcome to flamas472's minesweeper project"}</p>
      <Link
        href={"/play"}
      >
        new game
      </Link>
    </div>
  );
}
