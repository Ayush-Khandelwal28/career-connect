"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "JOB_SEEKER", // Default role
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/signin");
            } else {
                const { message } = await res.json();
                setError(message || "Failed to sign up");
            }
        } catch (err) {
            console.error("Sign-up error:", err);
            setError("An unexpected error occurred");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="JOB_SEEKER">Job Seeker</option>
                        <option value="RECRUITER">Recruiter</option>
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/signin")}
                        className="text-blue-500 underline"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
}
