import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-sans text-blue-500">Welcome</h1>
      <Link href="/properties">Show Properties</Link>
    </div>
  );
}

export default HomePage;
