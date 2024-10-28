import React, { useState, useEffect, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';
import { EducationInterface } from '@/types';

interface EducationProps {
  onClose: () => void;
  initialData?: EducationInterface
  isEditMode?: boolean;
  editIndex?: number;
}

const Education = forwardRef<HTMLFormElement, EducationProps>(
  ({ onClose, initialData, isEditMode, editIndex }, ref) => {
    const [educationDetails, setEducationDetails] = useState({} as EducationInterface);

    const { resumeData, updateSection, updateItem } = useResume();

    useEffect(() => {
      if (initialData) {
        setEducationDetails(initialData);
      }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEducationDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
    
      if (isEditMode && editIndex !== undefined && editIndex >= 0) {
        updateItem('education', editIndex, educationDetails);
      } else {
        const updatedEducation = [...resumeData.education, educationDetails];
        updateSection('education', updatedEducation);
      }
    
      onClose();
    };
    
    return (
      <div>
        <form className="space-y-4" ref={ref} onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">College Name</label>
            <input
              type="text"
              name="collegeName"
              value={educationDetails.collegeName}
              onChange={handleChange}
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
              value={educationDetails.degreeName}
              onChange={handleChange}
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
              value={educationDetails.courseName}
              onChange={handleChange}
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
                value={educationDetails.courseStartYear}
                onChange={handleChange}
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
                value={educationDetails.courseEndYear}
                onChange={handleChange}
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
              value={educationDetails.currentGPA}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Enter GPA (e.g., 7.20)"
            />
          </div>

          <button type="submit" style={{ display: 'none' }} />
        </form>
      </div>
    );
  }
);

export default Education;
