import React, { useState } from 'react';

const Education = () => {

    const [collegeName, setCollegeName] = useState('');
    const [degreeName, setDegreeName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseStartYear, setCourseStartYear] = useState('');
    const [courseEndYear, setCourseEndYear] = useState('');
    const [currentGPA, setCurrentGPA] = useState('');
    


    return (
        <div>
            <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">College Name</label>
            <input
              type="text"
              name="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Enter College Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Degree Name</label>
            <input
              type="text"
              name="degreeName"
              value={degreeName}
              onChange={(e) => setDegreeName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Enter Degree Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Enter Course Name"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Start Year</label>
              <input
                type="number"
                name="courseStartYear"
                value={courseStartYear}
                onChange={(e) => setCourseStartYear(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                placeholder="Start Year"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">End Year</label>
              <input
                type="number"
                name="courseEndYear"
                value={courseEndYear}
                onChange={(e) => setCourseEndYear(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                placeholder="End Year"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Current GPA</label>
            <input
              type="number"
              step="0.01"
              name="currentGPA"
              value={currentGPA}
              onChange={(e) => setCurrentGPA(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Enter GPA (e.g., 7.20)"
            />
          </div>
        </form>
        </div>
    )
}

export default Education