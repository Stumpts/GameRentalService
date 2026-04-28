import { useState } from "react"
import Navbar from "../components/Navbar";

export default function Rentals() {

    const [hasRentals, setHasRentals] = useState(true);

    return (
        <>
            <Navbar/>
            <h1 className="flex items-center justify-center text-3xl mt-4">My Rentals</h1>
            {hasRentals ? (
                <div className="grid grid-cols-1 gap-10 mt-4 w-full h-dvh p-4">
                    <div className="border rounded-md p-4"> Rental 1 </div>
                    <div className="border rounded-md p-4"> Rental 2 </div>
                    <div className="border rounded-md p-4"> Rental 3 </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 mt-4 w-full h-dvh p-4">
                    <h2 className="text-2xl">You have no rentals yet!</h2>
                    <a href="/games" className="border rounded-md p-4">
                        Rent a Game Now!
                    </a>
                </div>
            )}
        </>
    )
}