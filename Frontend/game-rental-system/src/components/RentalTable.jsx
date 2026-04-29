export default function RentalTable({ data }) { 

  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow-md bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-600">
          <tr>
            <th className="px-6 py-3">Account ID</th>
            <th className="px-6 py-3">Game ID</th>
            <th className="px-6 py-3">Rent Date</th>
            <th className="px-6 py-3">Return Date</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((rental) => {
            const isReturned = !!rental.returnDate;

            return (
              <tr
                key={`${rental.accountID}-${rental.gameID}-${rental.rentDate}`}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {rental.accountID}
                </td>

                <td className="px-6 py-4">{rental.gameID}</td>

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
