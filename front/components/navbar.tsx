import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center rounded-md p-2 text-gray-400">
            <div className="rounded-md px-3 py-2 text-sm font-medium bg-gray-900 text-white">
              <Link href="/" className="">
                Home
              </Link>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="rounded-md px-3 py-2 text-sm font-medium bg-gray-900 text-white">
              <Link href="/login">Login</Link>
            </div>
            <div className="rounded-md px-3 py-2 text-sm font-medium bg-gray-900 text-white">
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
