"use client";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";

export default function ToggleMode() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="bg-white dark:bg-black text-black dark:text-white p-2 rounded-full border-2 border-gray-800 dark:border-gray-400"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? <MdDarkMode size={25} /> : <IoSunnySharp size={25} />}
    </button>
  );
}
