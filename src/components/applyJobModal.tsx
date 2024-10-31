import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { uploadFileToS3 } from '../utils/uploadFileToS3';
import { useSession } from 'next-auth/react';

interface ShadCNDIalogProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: string;
}

const applyJob: React.FC<ShadCNDIalogProps> = ({ isOpen, onClose, jobTitle, jobId }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const { data: session } = useSession();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFileToS3(file);
      setResumeUrl(url);
    }
  };


  const handleSubmit = async () => {

    if (!resumeUrl) {
      alert("Please wait until the file is uploaded.");
      return;
    }


    const formDataToSend = {
      jobId,
      userId: session?.id!,
      email,
      phone,
      coverLetter: text,
      resumeLink: resumeUrl!,
    };

    const response = await fetch('/api/applyJob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataToSend),
    });

    if (response.ok) {
      alert('Application submitted successfully!');
      onClose();
    } else {
      alert('Failed to submit application');
    }

  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="e.g., your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="e.g., +1234567890"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Why you should be hired for this role?</label>
            <input
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="I am perfect for this role because..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            />
            {resume && (
              <p className="mt-2 text-sm text-gray-500">Selected file: {resume.name}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleSubmit}
          >
            Submit Application
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default applyJob;
