import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';


export default function Games() {
  const [games, setGames] = useState([]);
  const [searchGame, setSearchGame] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:8000/available-games");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const fetchSearchResults = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/search-games?search=${searchGame}`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center text-3xl mt-4">
        Our Available Games to Rent!
      </h1>

      <form onSubmit={fetchSearchResults} className="flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="Search for games..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mx-auto mt-4"
          value={searchGame}
          onChange={(e) => setSearchGame(e.target.value)}
        />
      </form>

      <Card games={games} setGames={setGames} />
    </>
  );
}
