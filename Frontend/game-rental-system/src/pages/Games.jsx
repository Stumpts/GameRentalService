import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';


export default function Games() {
  const [games, setGames] = useState([]);

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

  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center text-3xl mt-4">
        Our Available Games to Rent!
      </h1>

      <Card games={games} />
    </>
  );
}
