import React, { useState } from 'react';

const WorkExperience = () => {

  const [organizationName, setOrganizationName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [stillWorking, setStillWorking] = useState(false);

  const handleSubmit = () => {
    const formData = {
      organizationName,
      role,
      description,
      startDate: `${startMonth} ${startYear}`,
      endDate: stillWorking ? 'Present' : `${endMonth} ${endYear}`,
      stillWorking,
    };

    console.log('Form Data:', formData);

    alert('Work experience details submitted successfully!');
  };


  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);


  return (
    <div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization Name</label>
          <input
            type="text"
            name="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter Role"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
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
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
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
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              disabled={stillWorking}
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              disabled={stillWorking}
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
            id="stillWorking"
            checked={stillWorking}
            onChange={(e) => setStillWorking(e.target.checked)}
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="stillWorking" className="text-sm font-medium text-gray-700">
            Still Working
          </label>
        </div>
      </form>
    </div>
  )
}

export default WorkExperience