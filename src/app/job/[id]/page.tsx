"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ApplyJob from '../../../components/applyJobModal';

const Page = () => {
  const { id } = useParams() as { id: string };
  const [showApplication, setShowApplication] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) throw new Error('Failed to fetch job details');
        const jobData = await response.json();
        setJob(jobData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const applyJob = () => {
    setShowApplication(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <h2 className="text-xl font-semibold text-gray-600">{job.company}</h2>
        <p className="text-md text-gray-500">{job.location}</p>
        <p className="text-md text-gray-500">{job.type} | {job.workMode}</p>
        <p className="text-md text-gray-500">Posted on: {new Date(job.datePosted).toLocaleDateString()}</p>
        <p className="text-md text-gray-500">Salary: ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}</p>
        <h3 className="text-lg font-semibold mt-4">Description</h3>
        <p className="text-md text-gray-700">{job.description}</p>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" onClick={applyJob}>
          Apply Now
        </button>
      </div>
      {showApplication && <ApplyJob isOpen={showApplication} onClose={() => setShowApplication(false)} jobTitle={job.title} jobId={id} />}
    </div>
  );
};

export default Page;
