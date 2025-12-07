import ComputerNavbar from "./ComputerNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <div>
      <div className={`p-4 sm:block hidden`}>
        <ComputerNavbar />
      </div>
      <div className="sm:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}
