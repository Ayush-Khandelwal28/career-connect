"use client";

import { useEffect, useState } from 'react';
import {
  Briefcase,
  Building2,
  CalendarDays,
  DollarSign,
  MapPin,
  MonitorSmartphone,
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  workMode: string;
  minSalary: number;
  maxSalary: number;
  datePosted: string;
}

const  JobCard = () => {
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
        console.log(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewJob = (id: number) => {
    window.location.href = `/job/${id}`;
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-semibold text-red-600 dark:text-red-400">Error Loading Jobs</h2>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight dark:text-white">
          Available Positions
        </h1>
        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg border bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="flex animate-pulse flex-col space-y-4">
                  <div className="h-8 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="flex space-x-4">
                    <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="group rounded-lg border border-l-4 border-l-blue-600 bg-white p-6 shadow-md transition-all hover:border-l-8 dark:bg-gray-800"
              >
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight dark:text-white">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 rounded-full border bg-gray-50 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 rounded-full border bg-gray-50 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700">
                        <Briefcase className="h-3 w-3" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1 rounded-full border bg-gray-50 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700">
                        <MonitorSmartphone className="h-3 w-3" />
                        {job.workMode}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Company:</span> {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        Posted {new Date(job.datePosted).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-4">
                    <div className="flex items-center gap-1 text-lg font-medium dark:text-white">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleViewJob(job.id)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group-hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCard;