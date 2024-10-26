import React, { useState, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';

const WorkExperience = forwardRef<HTMLFormElement, { onClose: () => void }>(({ onClose }, ref) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    role: '',
    description: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    stillWorking: false,
  });
  
  const { resumeData, updateSection } = useResume(); // Get context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { organizationName, role, description, startMonth, startYear, endMonth, endYear, stillWorking } = formData;

    const workExperienceEntry = {
      organizationName,
      role,
      description,
      startDate: `${startMonth} ${startYear}`,
      endDate: stillWorking ? 'Present' : `${endMonth} ${endYear}`,
      stillWorking,
    };

    console.log('Form Data:', workExperienceEntry);

    updateSection('workExperience', [...resumeData.workExperience, workExperienceEntry]);

    alert('Work experience details submitted successfully!');
    
    setFormData({
      organizationName: '',
      role: '',
      description: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      stillWorking: false,
    });

    onClose();
  };

  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <form className="space-y-4" ref={ref} onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization Name</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Organization Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Role"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Brief description of your work"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <div className="flex space-x-2">
            <select
              name="startMonth"
              value={formData.startMonth}
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
              name="startYear"
              value={formData.startYear}
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
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <div className="flex space-x-2">
            <select
              name="endMonth"
              value={formData.endMonth}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              disabled={formData.stillWorking}
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              disabled={formData.stillWorking}
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

        <div className="flex items-center">
          <input
            type="checkbox"
            name="stillWorking"
            checked={formData.stillWorking}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="stillWorking" className="text-sm font-medium text-gray-700">
            Still Working
          </label>
        </div>
        <button type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
});

export default WorkExperience;
