import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 py-4 px-6 rounded-lg font-roboto shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">My Website</div>
          <ul className="flex">
            <li className="mr-6">
              <a href="#" className="text-white hover:text-blue-200">
                Home
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="text-white hover:text-blue-200">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-200">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
