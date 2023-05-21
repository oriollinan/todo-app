import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen">
      <div className="mx-auto max-w-full text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Get It Done!
        </h1>
        <p className="my-4 text-xl">
          With our Todo App, we empower you to be more productive
        </p>
        <Link
          href="/todo"
          className="mt-8 px-8 py-3 shadow-lg text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          My Todos
        </Link>
        <img
          className="mt-8 mx-auto"
          src="https://storage.googleapis.com/tweek-assets/promo-en.png"
          alt="Todo App"
        />
      </div>
    </main>
  );
}
