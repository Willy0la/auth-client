import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Auth App
        </h1>
        <p className="text-gray-500 mb-8">
          Secure authentication powered by NestJS and Next.js
        </p> 
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
