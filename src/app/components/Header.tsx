import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
        Career Connect
      </Link>
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link href="/Post" className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Post
            </Link>
          </li>
          <li>
            <Link href="/Profile" className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
