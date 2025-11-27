import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        fixed top-0 left-0 w-full 
        flex justify-between items-center 
        h-20 px-5 sm:px-10 md:px-20 
        text-white z-50
        backdrop-blur-md
      "
    >
      {/* Logo */}
      <p className="font-semibold text-2xl sm:text-3xl">🌱 GreenRemedy</p>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 font-semibold">
        <li>
          <a
            href="#"
            className="hover:bg-white hover:text-black px-5 py-2 rounded-full transition-colors duration-300"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="/login"
            className="hover:bg-white hover:text-black px-5 py-2 rounded-full transition-colors duration-300"
          >
            Login
          </a>
        </li>

        <li>
          <a
            href="/signup"
            className="hover:bg-white hover:text-black px-5 py-2 rounded-full transition-colors duration-300"
          >
            Sign Up
          </a>
        </li>

        <li>
          <a
            href="/about"
            className="bg-white text-black px-5 py-2 rounded-full transition-colors duration-300"
          >
            About
          </a>
        </li>
      </ul>

      {/* Mobile Hamburger Icon */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 left-0 w-full 
          bg-black/70 backdrop-blur-md 
          text-white font-semibold 
          flex flex-col items-center 
          gap-6 py-8 transition-all duration-300 md:hidden
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <a
          href="#"
          className="hover:text-teal-300 text-lg"
          onClick={() => setOpen(false)}
        >
          Home
        </a>

        <a
          href="/login"
          className="hover:text-teal-300 text-lg"
          onClick={() => setOpen(false)}
        >
          Login
        </a>

        <a
          href="/signup"
          className="hover:text-teal-300 text-lg"
          onClick={() => setOpen(false)}
        >
          Sign Up
        </a>

        <a
          href="/about"
          className="text-lg bg-white text-black px-6 py-2 rounded-full"
          onClick={() => setOpen(false)}
        >
          About
        </a>
      </div>
    </nav>
  );
}
