import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';

interface ShadCNDIalogProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const applyJob: React.FC<ShadCNDIalogProps> = ({ isOpen, onClose, jobTitle }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0]); 
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    if (resume) {
      formData.append('resume', resume);
    }

    console.log('Form Data:', {
      email,
      phone,
      resume,
    });

    alert('Application submitted successfully!');
    onClose(); 
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
