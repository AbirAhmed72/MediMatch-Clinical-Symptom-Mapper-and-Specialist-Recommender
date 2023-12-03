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
        <span className="text-xl font-extrabold text-gray-800">MediMatch</span>
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
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Logo />
          </div>
          <div className="flex items-center space-x-4 md:pl-4 md:justify-center md:flex-1">
            <NavItem to="/home" text="Home" />
            <NavItem to="/services" text="Services" />
            <NavItem to="/doctors" text="Doctors" />
            <NavItem to="/community" text="Community" />
            <NavItem to="/help" text="Help" />
          </div>
  
          {/* Social Media and Email Icons */}
          <div className="flex items-center space-x-4 ml-auto">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                className="h-6 w-6 cursor-pointer"
                src="/facebook.png" // Replace with the path to your Facebook icon
                alt="Facebook"
              />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img
                className="h-6 w-6 cursor-pointer"
                src="/twitter.png" // Replace with the path to your Twitter icon
                alt="Twitter"
              />
            </a>
            <a href="mailto:info@medicare.com">
              <img
                className="h-6 w-6 cursor-pointer"
                src="/email.png" // Replace with the path to your email icon
                alt="Email"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );  
}
