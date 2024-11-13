"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Eye,
  X,
  Briefcase,
  Loader2,
} from 'lucide-react';

interface Applicant {
  id: number;
  name: string;
  role: string;
}

interface Application {
  id: number;
  applicant: Applicant;
  email: string;
  phone: string;
  coverLetter: string;
  resumeLink: string;
}

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/applications/${id}`);
        const data = await response.json();
        setApplications(data);
        console.log("Applications:", data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  },);

  const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          {children}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-lg font-medium text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-2 flex justify-center">
            <Briefcase className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Job Applications
          </h1>
          <p className="mt-2 text-gray-600">
            Reviewing applications for Job ID: {id}
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-lg">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-lg font-medium text-gray-900">No applications yet</p>
            <p className="mt-2 text-gray-500">There are no applications for this position yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
              >
                <div className="border-b border-gray-100 bg-white p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{app.applicant.name}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedApplicant(app)}
                      className="flex items-center space-x-1 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Contact</span>
                    </button>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-600">{app.coverLetter}</p>
                  </div>

                  <div className="mt-4">
                    <a
                      href={app.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <FileText className="h-4 w-4" />
                      <span>View Resume</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal
          isOpen={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        >
          {selectedApplicant && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
                <p className="text-sm text-gray-500">
                  Contact information for {selectedApplicant.applicant.name}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <p className="text-gray-600">{selectedApplicant.email}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p className="text-gray-600">{selectedApplicant.phone}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default JobApplicationsPage;