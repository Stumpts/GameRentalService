import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RentalTable from "../components/RentalTable";

export default function Rentals() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get-rental-history?accountID=${sessionStorage.getItem("accountID")}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

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
