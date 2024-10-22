"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const JobCard = () => {
  const router = useRouter();

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      commitment: "Full Time",
      mode: "Onsite",
      datePosted: "2021-10-01",
      salary: 150000,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Facebook",
      location: "Menlo Park, CA",
      commitment: "Full Time",
      mode: "Remote",
      datePosted: "2021-09-15",
      salary: 130000,
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, WA",
      commitment: "Full Time",
      mode: "Hybrid",
      datePosted: "2021-08-20",
      salary: 140000,
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Apple",
      location: "Cupertino, CA",
      commitment: "Contract",
      mode: "Onsite",
      datePosted: "2021-07-30",
      salary: 120000,
    },
  ];

  const handleViewJob = (id: number) => {
    // router.push(`/job/${id}`);
    window.open(`/job/${id}`, '_blank');
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => job && (
          <div key={job.id} className="flex flex-row justify-between bg-white shadow-md rounded-lg p-6 items-center">
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <p className="text-lg text-gray-600">{job.company}</p>
              <p className="text-md text-gray-500">{job.location}</p>
              <p className="text-md text-gray-500">{job.commitment}</p>
              <p className="text-md text-gray-500">{job.mode}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <p className="text-md text-gray-500">Posted: {job.datePosted}</p>
              <p className="text-lg text-gray-600 font-semibold">${job.salary.toLocaleString()}</p>
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
