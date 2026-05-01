import { useState } from "react";
import ReviewModal from "./ReviewModal";
export default function RentalTable({ data }) { 

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReturn = async (rentalID) => {
    try {
      const response = await fetch(`http://localhost:8000/return-game?rentalID=${rentalID}`, {
        method: "PUT",
      });
      const data = await response.json();
      alert(data.message);
    }
    catch (error) {
      console.error("Error returning game:", error);
    }
  }


  return (
    <div className="flex items-center justify-center rounded-2xl shadow-md bg-white mt-4 mx-8">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-600">
          <tr>
            <th className="px-6 py-3">Rental ID</th>
            <th className="px-6 py-3">Game ID</th>
            <th className="px-6 py-3">Game Name</th>
            <th className="px-6 py-3">Rent Date</th>
            <th className="px-6 py-3">Return Date</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((rental) => {
            const isReturned = !!rental.returnDate; // checks if returnDate is NULL or not

            return (
              <tr
                key={rental.rentalID}
                className="hover:bg-gray-50 transition hover:cursor-pointer"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {rental.rentalID}
                </td>

                <td className="px-6 py-4">{rental.gameID}</td>
                <td className="px-6 py-4">{rental.gameName}</td>

                <td className="px-6 py-4">
                  {new Date(rental.rentDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  {rental.returnDate
                    ? new Date(rental.returnDate).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isReturned
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isReturned ? "Returned" : "Rented"}
                  </span>
                  {!isReturned && <button className="ml-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded cursor-pointer" onClick={() => handleReturn(rental.rentalID)}>Return</button>}
                  <button className="ml-2 bg-black hover:bg-gray-800 text-white py-1 px-3 rounded cursor-pointer" onClick={() => setReviewModalOpen(true)}>
                    Rate Game
                  </button>
                  {reviewModalOpen && (
                    <ReviewModal
                      accountID={sessionStorage.getItem("accountID")}
                      gameID={rental.gameID}
                      gameName={rental.gameName}
                      onClose={() => setReviewModalOpen(false)}
                    />
                  )}
                </td>
              </tr>
              
            );
          })}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No rental records found.
        </div>
      )}
    </div>
  );
}
