export default function Card({ games }) {
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

              <p className="text-xs text-gray-500">
                Released: {new Date(game.releaseDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
