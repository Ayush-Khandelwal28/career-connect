"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const role = session?.role;

  const jobSeekerNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Resume', href: '/resume' },
    // { name: 'Profile', href: '/profile' },
  ]

  const employerNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Post Job', href: '/post' },
    // { name: 'Profile', href: '/profile' },
  ]

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Career Connect
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {(role === 'RECRUITER' ? employerNavigation : jobSeekerNavigation).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            {session ? (
                <Button
                onClick={() => {
                  signOut();
                  router.push('/');
                }}
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                Sign Out
                </Button>
            ) : (
              <Button
                onClick={() => router.push('/signin')}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;