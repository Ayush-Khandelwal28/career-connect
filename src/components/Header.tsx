"use client";

import Link from 'next/link';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { data: session } = useSession();
  const Router = useRouter();

  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
        Career Connect
      </Link>
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link href="/resume" className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Resume
            </Link>
          </li>
          <li>
            <Link href="/post" className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Post
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Profile
            </Link>
          </li>
          <li>
            {session ? (
              <button
                onClick={() => signOut()}
                className="text-lg text-red-600 hover:text-red-800 transition-colors duration-300"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {Router.push('/signin')} }
                className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
