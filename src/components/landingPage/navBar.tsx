import ToggleMode from "../allPages/toggleMode";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-teal-950 text-white z-10 h-[60px] flex items-center justify-center uppercase">
      <ToggleMode />
    </nav>
  );
}
