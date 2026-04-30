export default function Navbar() {
  return (
    <>
      <nav className="grid grid-cols-3 border border-neutral-700 rounded-sm p-4 items-center">
        <a className="p-1 rounded-md relative w-30 h-ful lg:w-50 lg:h-full md:w-50 md:h-full duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105 hover:bg-gray-100" href="/home">
          <img src="/svg(1).svg" alt="logo" className="w-full h-full object-cover" />
        </a>

        <h1 className="flex items-center justify-center text-3xl">Game Pass</h1>

        <div className="hidden md:flex md:items-center md:justify-end gap-7">
          <a className="lg:text-3xl md:text-[20px] duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105" href="/games">
            Games
          </a>
          <a className="lg:text-3xl md:text-[20px] duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105" href="/rentals">
            My Rentals
          </a>
          <a className="lg:text-3xl md:text-[20px] duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:-translate-y-1 hover:scale-105" href="/profile">
            My Profile
          </a>
        </div>
      </nav>
    </>
  );
}
