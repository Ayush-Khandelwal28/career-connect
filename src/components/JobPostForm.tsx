"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  MonitorSmartphone,
  FileText,
  CalendarClock,
} from "lucide-react";

const JobPostForm = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "FULL_TIME",
    workMode: "ONSITE",
    minSalary: "",
    maxSalary: "",
    salaryType: "YEARLY",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const InputWrapper = ({
    icon: Icon,
    label,
    children,
  }: {
    icon: React.ElementType;
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="relative space-y-1">
      <label className="flex items-center gap-2 text-base font-medium text-gray-700">
        <Icon className="h-4 w-4 text-gray-500" />
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Post a New Job
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Fill in the details below to create a new job posting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <InputWrapper icon={Briefcase} label="Job Title">
                <input
                  type="text"
                  name="title"
                  value={job.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={Building2} label="Company">
                <input
                  type="text"
                  name="company"
                  value={job.company}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., Tech Solutions Inc."
                  required
                />
              </InputWrapper>

              <InputWrapper icon={MapPin} label="Location">
                <input
                  type="text"
                  name="location"
                  value={job.location}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={Clock} label="Job Type">
                <select
                  name="type"
                  value={job.type}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </InputWrapper>

              <InputWrapper icon={MonitorSmartphone} label="Work Mode">
                <select
                  name="workMode"
                  value={job.workMode}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="ONSITE">Onsite</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </InputWrapper>

              <InputWrapper icon={DollarSign} label="Salary Range">
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="minSalary"
                    value={job.minSalary}
                    onChange={handleInputChange}
                    className="w-1/2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Min"
                    required
                  />
                  <input
                    type="number"
                    name="maxSalary"
                    value={job.maxSalary}
                    onChange={handleInputChange}
                    className="w-1/2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Max"
                    required
                  />
                </div>
              </InputWrapper>

              <InputWrapper icon={CalendarClock} label="Salary Type">
                <select
                  name="salaryType"
                  value={job.salaryType}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="YEARLY">Yearly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </InputWrapper>
            </div>

            <InputWrapper icon={FileText} label="Job Description">
              <textarea
                name="description"
                value={job.description}
                onChange={handleInputChange}
                className="h-40 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Describe the role, responsibilities, requirements, and any other relevant details..."
                required
                minLength={500}
              />
              <p className="mt-1 text-sm text-gray-500">
                Minimum 500 characters required
              </p>
            </InputWrapper>

            <div className="border-t pt-6">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Briefcase className="h-5 w-5" />
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;