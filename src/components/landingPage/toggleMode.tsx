"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
import { CgDarkMode } from "react-icons/cg";

export default function ToggleMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="bg-white dark:bg-black text-[#026E81] dark:text-white p-2 rounded-full m-2">
        <CgDarkMode size={25} />
      </button>
    );
  }

  return (
    <button
      className="bg-white dark:bg-black text-[#026E81] dark:text-white p-2 rounded-full m-2"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? <MdDarkMode size={25} /> : <IoSunnySharp size={25} />}
    </button>
  );
}
