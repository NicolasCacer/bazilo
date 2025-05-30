"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white">
      <section className="flex-grow flex flex-col justify-center items-center px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
          Welcome to <span className="text-teal-400">Bazilo</span>
        </h1>
        <p className="text-lg md:text-xl max-w-xl mb-8 text-teal-200 drop-shadow-md">
          The ultimate online gaming platform where excitement never stops. Join
          thousands of players, compete in epic games, and level up your gaming
          skills!
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-teal-600 hover:bg-teal-700 transition px-8 py-3 rounded-lg font-semibold uppercase shadow-lg drop-shadow-md"
            aria-label="Sign In to Bazilo"
          >
            Sign In
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-teal-600 hover:bg-teal-700 transition px-8 py-3 rounded-lg font-semibold uppercase shadow-lg drop-shadow-md"
            aria-label="Login to Bazilo"
          >
            Login
          </button>
        </div>
      </section>

      <section className="bg-teal-900 bg-opacity-30 py-12 mt-20 w-full">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">Play Anytime</h3>
            <p className="text-teal-200">Access Bazilo from any device.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Epic Games</h3>
            <p className="text-teal-200">Dive into a wide variety of games.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Join the Community</h3>
            <p className="text-teal-200">
              Connect with fellow gamers, join live sessions and enhance your
              abilities.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-teal-400 text-sm">
        &copy; 2025 Bazilo. All rights reserved.
      </footer>
    </main>
  );
}
