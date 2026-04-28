export default function Navbar() {
  return (
    <>
      <nav className="grid grid-cols-3 border border-neutral-700 rounded-sm p-4 items-center">
        <div className="p-1 rounded-md relative w-30 h-ful lg:w-50 lg:h-full md:w-50 md:h-full">
          <h1 className="text-3xl">Something here</h1>
        </div>

        <h1 className="flex items-center justify-center text-3xl">Game Pass</h1>

        <div className="hidden md:flex md:items-center md:justify-end gap-7">
          <a className="lg:text-3xl md:text-[20px]" href="/games">
            Games
          </a>
          <a className="lg:text-3xl md:text-[20px]" href="/rentals">
            My Rentals
          </a>
          <a className="lg:text-3xl md:text-[20px]" href="/">
            Something
          </a>
        </div>
      </nav>
    </>
  );
}
