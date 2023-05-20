import Link from "next/link";

export const metadata = {
  title: "Home | ChiliFinder",
};

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0">
      <h1 className="mb-10 text-xl md:text-3xl font-bold">ChiliFinder</h1>

      <Link
        href="/predict"
        className="bg-red-500 px-8 py-2 font-semibold text-white text-lg md:text-2xl rounded-md"
      >
        Get Started
      </Link>
    </div>
  );
}
