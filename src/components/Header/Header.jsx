import React from "react";
import {MdLightMode, MdDarkMode} from "react-icons/md";
import {motion} from "framer-motion";

function Header({darkModeToggle, darkMode}) {
  return (
    <header className="text-bgLight sm:mb-6 mb-4 flex items-center justify-between w-full">
      <h1 className=" font-bold tracking-[.30em] sm:text-[2em] text-[1.5em]">
        TODO
      </h1>
      <motion.div
        animate={{scale: darkMode ? 1.1 : 1, rotate: darkMode ? 180 : 0}}
        transition={{duration: 0.5}}
        className="sm:text-3xl text-2xl cursor-pointer"
        onClick={darkModeToggle}>
        {darkMode ? (
          <MdLightMode className="hover:scale-110 hover:duration-500 ease-in-out transition-transform  " />
        ) : (
          <MdDarkMode className="hover:scale-110 hover:duration-500 ease-out transition-transform  " />
        )}
      </motion.div>
    </header>
  );
}

export default Header;
