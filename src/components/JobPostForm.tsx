"use client";

import React, { useState } from "react";

const JobPostForm = () => {

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full Time",
        work: "Onsite",
        datePosted: "",
        minSalary: "",
        maxSalary: "",
        salaryType: "Yearly",
        description: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch("/api/postJob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(job),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            alert("Job posted successfully!");
        } catch (error) {
            console.error("Failed to post job:", error);
            alert("Failed to post job.");
        }
    };
    


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Post a Job</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col space-y-4">
                        <label className="block text-lg font-medium text-gray-700">
                            Job Title
                            <input
                                type="text"
                                name="title"
                                value={job.title}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                                placeholder="e.g., Software Engineer"
                                required
                            />
                        </label>

                        <label className="block text-lg font-medium text-gray-700">
                            Company
                            <input
                                type="text"
                                name="company"
                                value={job.company}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                                placeholder="e.g., Google"
                                required
                            />
                        </label>

                        <label className="block text-lg font-medium text-gray-700">
                            Location
                            <input
                                type="text"
                                name="location"
                                value={job.location}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                                placeholder="e.g., Mountain View, CA"
                                required
                            />
                        </label>

                        <label className="block text-lg font-medium text-gray-700">
                            Job Type
                            <select
                                name="type"
                                value={job.type}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </label>

                        <label className="block text-lg font-medium text-gray-700">
                            Work Mode
                            <select
                                name="work"
                                value={job.work}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Onsite">Onsite</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </label>

                        <label className="block text-lg font-medium text-gray-700">
                            Salary Range
                            <div className="flex space-x-4 mt-1">
                                <input
                                    type="number"
                                    name="minSalary"
                                    value={job.minSalary}
                                    onChange={handleInputChange}
                                    className="w-1/2 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                                    placeholder="Min Salary"
                                    required
                                />
                                <input
                                    type="number"
                                    name="maxSalary"
                                    value={job.maxSalary}
                                    onChange={handleInputChange}
                                    className="w-1/2 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                                    placeholder="Max Salary"
                                    required
                                />
                            </div>
                        </label>

                        <label className="block text-lg font-medium text-gray-700 mt-4">
                            Salary Type
                            <select
                                name="salaryType"
                                value={job.salaryType}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Yearly">Yearly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </label>


                        <label className="block text-lg font-medium text-gray-700">
                            Job Description
                            <textarea
                                name="description"
                                value={job.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                                placeholder="Describe the job role..."
                                rows={4}
                                required
                                minLength={500}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Post Job
                    </button>
                </form>
            </div>
        </div>
    )
}

export default JobPostForm