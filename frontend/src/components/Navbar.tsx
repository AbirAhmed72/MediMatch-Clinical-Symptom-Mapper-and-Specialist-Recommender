import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <a className="flex items-center space-x-2">
        <img
          className="h-8 w-8 lg:hidden cursor-pointer"
          src="/platform-icon.jpg"
          alt="platform-icon"
        />
        <img
          className="hidden h-15 w-12 lg:block cursor-pointer"
          src="/platform-icon.jpg"
          alt="platform-icon"
        />
        <span className="text-xl font-extrabold text-gray-800">Medicare</span>
      </a>
    </Link>
  );
}

interface NavItemProps {
    to: string;
    text: string;
}

function NavItem({ to, text }: NavItemProps) {
  return (
    <Link to={to}>
      <a className="text-gray-600 hover:text-gray-800 font-extrabold">{text}</a>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-b from-gray-100 to-gray-200 p-2 sticky top-0 z-50">
      <div className="mx-auto max-w-8xl px-4 sm:px-8">
        <div className="flex justify between items-center h-16">
          <div className="flex items-center space-x-4">
            <Logo />
          </div>
          <div className="flex items-center space-x-4 pl-52">
            <NavItem to="/home" text="Home" />
            <NavItem to="/createCommunity" text="Create Community" />
            <NavItem to="/community" text="Community" />
            <NavItem to="/marketplace" text="Marketplace" />
          </div>
        </div>
      </div>
    </nav>
  );
}
