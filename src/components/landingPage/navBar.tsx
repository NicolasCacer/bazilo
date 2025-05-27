import { CgMenuLeftAlt } from "react-icons/cg";
import ToggleMode from "./toggleMode";
export default function NavBar() {
  return (
    <nav className="bg-[#026E81] uppercase flex justify-between items-center text-white h-15">
      <CgMenuLeftAlt size={40} className="m-2 text-white dark:text-black" />
      <div className="text-5xl text-white dark:text-black">BAZILO</div>
      <ToggleMode />
    </nav>
  );
}
