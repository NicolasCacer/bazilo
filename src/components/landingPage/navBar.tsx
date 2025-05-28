import ToggleMode from "../allPages/toggleMode";
export default function NavBar() {
  return (
    <nav className="bg-[#026E81] uppercase flex justify-center items-center text-white h-15">
      <div className="text-5xl text-white dark:text-black">BAZILO</div>
      <ToggleMode />
    </nav>
  );
}
