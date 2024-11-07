"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const features = [
    {
        title: "Top Companies",
        description: "Connect with industry-leading companies"
    },
    {
        title: "Skilled Talent",
        description: "Access a pool of qualified professionals"
    },
    {
        title: "Resume Builder",
        description: "Create a professional resume directly on the platform"
    },
];

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-20 pb-16 text-center lg:pt-32">
                    <div className="animate-fade-in-up">
                        <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6">
                            Find Your Next{" "}
                            <span className="text-blue-600">Dream Opportunity</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                            Connect with top companies and talent through our platform.
                            Whether you&apos;re hiring or seeking opportunities, we&apos;ve got you covered.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                        <button
                            onClick={() => router.push('/signup')}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
                        >
                            Get Started
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                        <button
                            onClick={() => router.push('/signin')}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 transform hover:scale-105"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                <div className="py-20 animate-fade-in-up delay-900">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                            >
                                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}