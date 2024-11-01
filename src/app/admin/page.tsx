"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RecruiterAdminPage = () => {
    const [jobs, setJobs] = useState<{ id: string; title: string; description: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();
    const Router = useRouter();

    useEffect(() => {
        const fetchJobs = async () => {
            if (!session) return; 
            try {
                const recruiterId = session.id;
                console.log("Recruiter ID:", recruiterId);

                if (recruiterId) {
                    const response = await fetch(`/api/postedJobs/${recruiterId}`);
                    const data = await response.json();
                    setJobs(data);
                    console.log("Jobs:", data);
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchJobs();
    }, [session]); // Re-run effect when session data changes

    return (
        <div className="max-w-3xl mx-auto p-6 font-sans">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Recruiter Admin Page</h1>
            <button
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mb-8 mx-auto block"
                onClick={() => Router.push("/post")}
            >
                Post New Job
            </button>

            {loading ? (
                <p className="text-center text-lg text-gray-500">Loading jobs...</p>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Posted Jobs</h2>
                    <ul className="space-y-4">
                        {jobs.map((job) => (
                            <li key={job.id} onClick={() => Router.push(`/job/${job.id}`)} className="border p-4 rounded shadow-sm hover:shadow-md transition duration-150">
                                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                <p className="text-gray-700">{job.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecruiterAdminPage;
