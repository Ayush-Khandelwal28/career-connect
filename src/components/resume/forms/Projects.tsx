import React, { useState, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';

interface ProjectProps {
  onClose: () => void;
}

const PersonalProject = forwardRef<HTMLFormElement, ProjectProps>(({ onClose }, ref) => {
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    projectLink: '',
    month: '',
    year: '',
    projectDescription: '',
  });

  const { resumeData, updateSection } = useResume();

  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProject = { ...projectDetails, startDate: `${projectDetails.month} ${projectDetails.year}` };

    const updatedProjects = [...resumeData.projects, newProject];
    updateSection('projects', updatedProjects);

    alert('Project details submitted successfully!');

    setProjectDetails({
      projectName: '',
      projectLink: '',
      month: '',
      year: '',
      projectDescription: '',
    });

    onClose(); 
  };

  return (
    <div>
      <form className="space-y-4" ref={ref} onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name of Project</label>
          <input
            type="text"
            name="projectName"
            value={projectDetails.projectName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Project Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Link of Project</label>
          <input
            type="url"
            name="projectLink"
            value={projectDetails.projectLink}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Project Link"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <div className="flex space-x-2">
            <select
              name="month"
              value={projectDetails.month}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={projectDetails.year}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="projectDescription"
            value={projectDetails.projectDescription}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Project Description"
          />
        </div>

        <button type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
});

export default PersonalProject;
