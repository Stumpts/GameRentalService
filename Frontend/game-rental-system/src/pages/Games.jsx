import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Games() {
  
    // dummy data for testing, will replace with actual data from backend later
    const data = [
    {
      gameID: 1,
      name: "Elden Ring",
      publisher: "FromSoftware",
      ageRating: "M",
      price: 59.99,
      averageStarRating: 4.85,
      releaseDate: "2022-02-25",
    },
    {
      gameID: 2,
      name: "Stardew Valley",
      publisher: "ConcernedApe",
      ageRating: "E",
      price: 14.99,
      averageStarRating: 4.95,
      releaseDate: "2016-02-26"
    },
  ];

  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center text-3xl mt-4">
        Our Available Games to Rent!
      </h1>

      <Card games={data} />
    </>
  );
}
