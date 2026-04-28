import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center text-4xl mt-4">
        Welcome To Game Pass!
      </h1>

      <div className="grid grid-cols-3 gap-10 mt-4 w-full h-dvh p-4">
        <a
          className="flex items-center justify-center border rounded-md h-full bg-["
          href="/games"
        >
          <h2 className="text-2xl">Games</h2>
        </a>
        <a
          className="flex items-center justify-center border rounded-md h-full"
          href="/"
        >
          <h2 className="text-2xl">My Rentals</h2>
        </a>
        <a
          className="flex items-center justify-center border rounded-md h-full"
          href="/"
        >
          <h2 className="text-2xl">My Profile</h2>
        </a>
      </div>
    </>
  );
}
