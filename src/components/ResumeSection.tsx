"use client";
import React from 'react';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

interface Education {
  collegeName: string;
  degreeName: string;
  courseName: string;
  courseStartYear: string;
  courseEndYear: string;
  currentGPA: string;
}

interface WorkExperience {
  jobTitle: string;
  companyName: string;
  jobStartYear: string;
  jobEndYear: string;
  jobDescription: string;
}

interface Projects {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  month: string;
  year: string;
}

interface ResumeData {
  careerObjective: string;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Projects[];
  achievements: string[];
  skills: string[];
}

interface ResumeSectionProps {
  title: string;
  subtitle?: string;
  content: string | string[] | Education[] | WorkExperience[] | Projects[];
  onAdd?: () => void;
  onEdit?: (index?: number) => void;
  onDelete?: (index?: number) => void;
  allowMultiple?: boolean;
  type: keyof ResumeData;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
  title,
  subtitle,
  content,
  onAdd,
  onEdit,
  onDelete,
  allowMultiple = true,
  type
}) => {
  const renderContent = (
    item: string | Education | WorkExperience | Projects,
    type: keyof ResumeData
  ) => {
    if (typeof item === "string") {
      return <p>{item}</p>;
    }
  
    switch (type) {
      case "education":
        const edu = item as Education;
        return (
          <div>
            <h4 className="font-semibold">{edu.collegeName}</h4>
            <p>{edu.degreeName} - {edu.courseName}</p>
            <p className="text-sm text-gray-600">{edu.courseStartYear} - {edu.courseEndYear}</p>
            <p className="text-sm">GPA: {edu.currentGPA}</p>
          </div>
        );
  
      case "workExperience":
        const work = item as WorkExperience;
        return (
          <div>
            <h4 className="font-semibold">{work.jobTitle}</h4>
            <p>{work.companyName}</p>
            <p className="text-sm text-gray-600">{work.jobStartYear} - {work.jobEndYear}</p>
            <p>{work.jobDescription}</p>
          </div>
        );
  
      case "projects":
        const project = item as Projects;
        return (
          <div>
            <h4 className="font-semibold">{project.projectName}</h4>
            <p>{project.projectDescription}</p>
            <p className="text-sm text-gray-600">{project.month} {project.year}</p>
            {project.projectLink && (
              <a href={project.projectLink} className="text-blue-600 hover:text-blue-800 text-sm">
                Project Link
              </a>
            )}
          </div>
        );
  
      default:
        return <p>{JSON.stringify(item)}</p>;
    }
  };
  

  console.log("Resume Data of Ayush is" , content);

  return (
    <div className="flex flex-col space-y-4 p-4 border-b border-gray-200">
      <div className="flex">
        <div className="w-1/4 text-gray-600 font-semibold">
          <h3>{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="w-3/4">
          {Array.isArray(content) ? (
            content.map((item, index) => (
              <div key={index} className="relative mb-4">
                <div className="pr-10">
                  {renderContent(item, type)}
                </div>
                <div className="absolute top-0 right-0 flex space-x-2">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(index)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(index)} 
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="relative mb-4">
              <div className="pr-10">
                {renderContent(content, type)}
              </div>
              <div className="absolute top-0 right-0 flex space-x-2">
                {onEdit && (
                  <button 
                    onClick={() => onEdit()} 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button 
                    onClick={() => onDelete()} 
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {onAdd && (allowMultiple || (!Array.isArray(content) || content.length === 0)) && (
        <div className="flex justify-end">
          <button 
            onClick={onAdd} 
            className="text-blue-600 flex items-center space-x-1 hover:text-blue-800"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add {title.toLowerCase()}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeSection;