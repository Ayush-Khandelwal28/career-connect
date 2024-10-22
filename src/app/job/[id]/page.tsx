"use client";

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import ApplyJob from '../../../components/applyJob';

const page = () => {
  const { id } = useParams();
  const [showApplication, setShowApplication] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full Time",
      work: "Onsite",
      datePosted: "2021-10-01",
      salary: 150000,
      description: "As a Software Engineer at Google, you will work on exciting projects...",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Facebook",
      location: "Menlo Park, CA",
      type: "Full Time",
      work: "Remote",
      datePosted: "2021-09-15",
      salary: 130000,
      description: "As a Product Manager at Facebook, you will lead product development...",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full Time",
      work: "Hybrid",
      datePosted: "2021-08-20",
      salary: 140000,
      description: "As a Data Scientist at Amazon, you will analyze data to drive decisions...",
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Contract",
      work: "Onsite",
      datePosted: "2021-07-30",
      salary: 120000,
      description: "As a UX Designer at Apple, you will design user-centered experiences...",
    },
  ];

  const applyJob = () => {
    setShowApplication(true);
  };
  

  if (!id) {
    return <div>Loading...</div>;
  }

  const job = jobs.find(job => job.id === Number(id));

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <h2 className="text-xl font-semibold text-gray-600">{job.company}</h2>
        <p className="text-md text-gray-500">{job.location}</p>
        <p className="text-md text-gray-500">{job.type} | {job.work}</p>
        <p className="text-md text-gray-500">Posted on: {job.datePosted}</p>
        <p className="text-md text-gray-500">Salary: ${job.salary.toLocaleString()}</p>
        <h3 className="text-lg font-semibold mt-4">Description</h3>
        <p className="text-md text-gray-700">{job.description}</p>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" onClick={applyJob}>
          Apply Now
        </button>
      </div>
      {showApplication && <ApplyJob 
      isOpen={showApplication} 
      onClose={() => setShowApplication(false)} 
      jobTitle={job.title} />}
    </div>
  );
};

export default page;
