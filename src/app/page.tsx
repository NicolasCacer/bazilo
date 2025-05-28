"use client";
import { useRouter } from "next/navigation";
import NavBar from "@/components/landingPage/navBar";
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex-grow flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <button
          className="bg-red-600 rounded-[10px] p-1 text-white"
          onClick={() => router.push("/sing-in")}
        >
          sign-in
        </button>
        <button
          className="bg-green-600 rounded-[10px] p-1 text-white"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </main>
  );
}
