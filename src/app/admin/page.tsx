"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Briefcase, ArrowRight} from 'lucide-react';
import Loading from '@/components/Loading';

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
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Briefcase className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recruiter Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your job postings and applications
          </p>
        </div>

        <button
          onClick={() => Router.push("/post")}
          className="flex items-center gap-2 px-6 py-3 mx-auto text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
        >
          <PlusCircle className="h-5 w-5" />
          Post New Job
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Posted Jobs
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              View and manage all your active job listings
            </p>
          </div>

          <div className="p-6">
            {loading ? (
              <Loading />
            ) : jobs.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => Router.push(`/job/${job.id}`)}
                    className="group p-6 bg-gray-50 dark:bg-gray-900 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No jobs posted yet. Click &quot;Post New Job&quot; to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterAdminPage;
