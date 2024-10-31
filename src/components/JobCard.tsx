"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  workMode: string;
  minSalary: number;
  maxSalary: number;
  datePosted: string;
}

const JobCard = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewJob = (id: number) => {
    router.push(`/job/${id}`);
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="flex flex-row justify-between bg-white shadow-md rounded-lg p-6 items-center">
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <p className="text-lg text-gray-600">{job.location}</p>
              <p className="text-md text-gray-500">{job.type}</p>
              <p className="text-md text-gray-500">{job.workMode}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <p className="text-md text-gray-500">Posted: {new Date(job.datePosted).toLocaleDateString()}</p>
              <p className="text-lg text-gray-600 font-semibold">${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => handleViewJob(job.id)}
              >
                View Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
