"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ApplyJob from '../../../components/applyJobModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  MonitorSmartphone,
  ScrollText,
  Users,
} from 'lucide-react';
import Loading from '@/components/Loading';

const Page = () => {
  const { id } = useParams() as { id: string };
  const [showApplication, setShowApplication] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const Router = useRouter();

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
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg rounded-lg border bg-white p-6 text-center shadow-lg">
          <h2 className="mb-2 text-2xl font-semibold text-red-600">Error Loading Job</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg rounded-lg border bg-white p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">Job Not Found</h2>
          <p className="mt-2 text-gray-600">The job posting you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{job.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="h-5 w-5" />
                  <span className="text-xl font-medium">{job.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-blue-100 px-4 py-2 text-lg font-medium text-blue-700">
                <DollarSign className="h-5 w-5" />
                {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-4">
              <MapPin className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="text-base text-gray-900">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-4">
              <Briefcase className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Job Type</p>
                <p className="text-base text-gray-900">{job.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-4">
              <MonitorSmartphone className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Work Mode</p>
                <p className="text-base text-gray-900">{job.workMode}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t px-6 py-8">
            <div className="flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
            </div>
            <p className="whitespace-pre-wrap text-gray-600">{job.description}</p>
          </div>

          <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="h-4 w-4" />
              Posted on: {new Date(job.datePosted).toLocaleDateString()}
            </div>
            <div className="flex gap-3">
              {session?.role === 'JOB_SEEKER' && (
                <button
                  onClick={applyJob}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Apply Now
                </button>
              )}
              {session?.role === 'RECRUITER' && (
                <button
                  onClick={() => Router.push(`/job/applications/${id}`)}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-white transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Users className="h-4 w-4" />
                  View Applicants
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showApplication && (
        <ApplyJob
          isOpen={showApplication}
          onClose={() => setShowApplication(false)}
          jobTitle={job.title}
          jobId={id}
        />
      )}
    </div>
  );
};

export default Page;