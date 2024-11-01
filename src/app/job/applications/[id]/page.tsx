"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from '../../../../components/ui/dialog';

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
    }, [id]);

    const handleShowContactDetails = (app: Application) => {
        setSelectedApplicant(app);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 font-sans">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Job Applications</h1>

            {loading ? (
                <p className="text-center text-lg text-gray-500">Loading applications...</p>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Applications for Job ID: {id}</h2>
                    <ul className="space-y-4">
                        {applications.length ? (
                            applications.map((app) => (
                                <li key={app.id} className="border p-4 rounded shadow-sm hover:shadow-md transition duration-150">
                                    <p className="text-lg font-semibold text-gray-900">{app.applicant.name}</p>
                                    <p className="text-gray-700">{app.coverLetter}</p>
                                    
                                    <div className="mt-2 flex items-center justify-between">
                                        <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            View Resume
                                        </a>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    onClick={() => handleShowContactDetails(app)}
                                                    className="bg-blue-600 text-white font-semibold py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
                                                >
                                                    Show Contact Details
                                                </button>
                                            </DialogTrigger>
                                            {selectedApplicant && (
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Contact Details</DialogTitle>
                                                        <DialogDescription>
                                                            <p>Email: {selectedApplicant.email}</p>
                                                            <p>Phone: {selectedApplicant.phone}</p>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogClose>
                                                        Close
                                                    </DialogClose>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-lg text-gray-500">No applications found for this job.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default JobApplicationsPage;
