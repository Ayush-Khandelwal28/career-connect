import React, { useState } from 'react';

const PersonalProject = () => {

  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = () => {
    const formData = {
      projectName,
      projectLink,
      startDate: `${month} ${year}`,
      projectDescription,
    };

    console.log('Form Data:', formData);
    alert('Project details submitted successfully!');
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name of Project</label>
          <input
            type="text"
            name="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
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
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Project Link"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <div className="flex space-x-2">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
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
              value={year}
              onChange={(e) => setYear(e.target.value)}
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
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Project Description"
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalProject;
