export default function Card({ text, hreflink }) {
  return (
    <>
      <a className="flex items-center justify-center border rounded-md h-full" href={hreflink}>
        <h2> {text} </h2>
      </a>
    </>
  );
}
