"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthComponent() {
    const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (session) {
        return (
            <div className="flex flex-col items-center">
                <p className="text-lg mb-4">Signed in as {session?.user?.email}</p>
                <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Sign out
                </button>
            </div>
        );
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (!result?.error) {
            console.log("Sign in successful");
            router.push("/"); 
        } else {
            alert("Authentication failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <p className="text-lg">Not signed in</p>
            <form onSubmit={handleSignIn} className="flex flex-col space-y-2 w-full max-w-md">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Sign In
                </button>
            </form>
            <button
                onClick={() => router.push("/signup")}
                className="text-blue-500 underline mt-4"
            >
                Sign Up
            </button>
        </div>
    );
}
