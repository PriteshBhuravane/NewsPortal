import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { IoMdLogOut } from "react-icons/io";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 20,
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 20,
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.1 } },
    closed: { opacity: 0, x: -20, transition: { duration: 0.1 } },
  };

  return (
    <nav className="bg-slate-950 border-gray-700 w-full top-0 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Newsportal
          </span>
        </a>
        <div className="flex md:order-2">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white"
              placeholder="Search..."
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
            />
          </div>
          {auth.currentUser ? (
            <button className="text-white text-3xl px-10" onClick={logout}>
              <IoMdLogOut />
            </button>
          ) : (
            <Link to="/signin">
              <button className="text-white text-3xl px-10">
                <FaUserCircle />
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
            aria-controls="navbar-search"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          {/* Mobile Search */}
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white"
              placeholder="Search..."
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
            />
          </div>

          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
            <li>
              <a
                onClick={() => {
                  props.setMenu("All");
                  props.setSearch("");
                  closeDropdown();
                }}
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  props.setMenu("All");
                  props.setSearch("");
                  closeDropdown();
                }}
                href="/"
                className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
              >
                News
              </a>
            </li>
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
              >
                Categories
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                    className="absolute left-0 z-10 mt-2 w-48 bg-gray-800 rounded-md shadow-lg"
                  >
                    {["Sport", "Business", "Politics", "Entertainment", "Technology", "Science", "Health"].map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => {
                          props.setMenu(category);
                          props.setSearch("");
                          closeDropdown();
                        }}
                        variants={itemVariants}
                        className="block w-full text-start px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                      >
                        {category}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <a
                onClick={() => {
                  props.setMenu("All");
                  closeDropdown();
                }}
                href="/fav"
                className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
              >
                Favourite
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;