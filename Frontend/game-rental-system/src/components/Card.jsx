export default function Card({ games }) {
  
  function handleRent(gameID) {
    // Implement rent logic here, e.g., send a request to the backend to rent the game
    console.log(`Renting game with ID: ${gameID}`);
  }
  
  return (
    <>
      <div className="p-6 max-w-5xl mx-auto cursor-pointer">
        <div className="grid gap-5 md:grid-cols-2">
          {games.map((game) => (
            <div
              key={game.gameID}
              className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{game.name}</h3>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                  {game.ageRating}
                </span>
              </div>

              <p className="text-gray-600 mb-2">Publisher: {game.publisher}</p>

              <div className="flex justify-between text-sm text-gray-700 mb-3">
                <span>⭐ {game.averageStarRating.toFixed(2)}</span>
                <span>${game.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-gray-500">
                  Released: {new Date(game.releaseDate).toLocaleDateString()}
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded cursor-pointer ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105" onClick={() => handleRent(game.gameID)}>
                  Rent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
