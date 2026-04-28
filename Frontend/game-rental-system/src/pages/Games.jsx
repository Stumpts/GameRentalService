import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Games() {

    const listOfGames = ["game", "game", "game", "game"];

    return (
        <>
            <Navbar/>
            <h1 className="flex items-center justify-center text-3xl mt-4">Our Current Available Games to Rent!</h1>
            
            <div className="grid grid-cols-3 gap-10 mt-4 w-full h-dvh p-4">
                {listOfGames.map((game) => (
                    <Card text={game} hreflink=""/>
                ))}

            </div>
        </>
    )
}