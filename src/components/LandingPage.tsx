"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import image from '../../assets/image.png';

const LandingPage = () => {
    const router = useRouter();

    const handleSignUp = () => {
        router.push('/signup');
    };

    const handleLogIn = () => {
        router.push('/signin');
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
                <Image
                    src={image}
                    alt="Landing Image"
                    layout="responsive"
                    objectFit="cover"
                />
            </div>
            <div className="relative z-10 text-center md:text-left text-gray-800 max-w-2xl p-6">
                <h1 className="text-5xl font-bold mb-6 tracking-wide">
                    Find Your Next Dream Opportunity/Candidate
                </h1>
                <p className="text-lg mb-10 leading-relaxed">
                    Discover job opportunities and talented candidates in a platform designed to connect your goals and skills with the right career path.
                </p>
                <div className="flex flex-row space-x-4 justify-center md:justify-start">
                    <button
                        className="px-8 py-3 bg-blue-700 rounded-full font-semibold text-white shadow-lg hover:bg-blue-800 hover:shadow-xl transition duration-300 transform hover:scale-105"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                    <button
                        className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold shadow-lg hover:bg-gray-200 hover:shadow-xl transition duration-300 transform hover:scale-105"
                        onClick={handleLogIn}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
