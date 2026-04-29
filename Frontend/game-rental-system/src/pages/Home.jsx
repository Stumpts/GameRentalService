import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center text-4xl mt-4">
        Welcome To Game Pass!
      </h1>

      <div className="grid grid-cols-3 gap-10 mt-4 w-full h-[50dvh] p-4">
        <a
          className="flex items-center justify-center border rounded-md h-full bg-[url('/game.svg')] bg-cover font-pt-serif px-5 py-2.5 text-black duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105"
          href="/games"
        >
          
        </a>
        <a
          className="flex items-center justify-center bg-[url('/rentalhistory.svg')] bg-cover bg-center border rounded-md h-full font-pt-serif px-5 py-2.5 text-black duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105"
          href="/rentals"
        >
          
        </a>
        <a
          className="flex items-center justify-center border rounded-md h-full bg-[url('/myprofile.svg')] bg-cover bg-center font-pt-serif px-5 py-2.5 text-black duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105"
          href="/profile"
        >
        </a>
      </div>
    </>
  );
}
