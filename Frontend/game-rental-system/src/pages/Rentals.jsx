import { useState } from "react";
import Navbar from "../components/Navbar";
import RentalTable from "../components/RentalTable";

export default function Rentals() {
  const [hasRentals, setHasRentals] = useState(true);

  const data = [
    {
      accountID: 1,
      gameID: 101,
      rentDate: "2026-04-01",
      returnDate: "2026-04-10",
    },
    {
      accountID: 2,
      gameID: 205,
      rentDate: "2026-04-05",
      returnDate: null,
    },
  ];

  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center text-3xl mt-4">
        My Rentals
      </h1>
      <RentalTable data={data} />
    </>
  );
}
