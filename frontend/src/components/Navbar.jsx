import React from "react";

const Navbar = () => {
    return (
      <nav className="p-4 bg-secondary text-primary font-bold text-lg">
        <a href="/" className="mr-4 hover:text-white">Home</a>
        <a href="/shorten" className="mr-4 hover:text-white">Shorten</a>
        <a href="/details" className="mr-4 hover:text-white">Details</a>
        <a href="/topurls" className="hover:text-white">Top URLs</a>
      </nav>
    );
  };

export default Navbar;
  