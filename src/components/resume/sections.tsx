import { ReactNode } from 'react';
import { ResumeData } from '../../types';

type SectionConfig = {
  [K in keyof ResumeData]: {
    key: K;
    title: string;
    renderItem: (item: ResumeData[K][0]) => ReactNode;
  };
};

export function useSections() {
  const sections: SectionConfig[keyof SectionConfig][] = [
    {
      key: 'careerObjective',
      title: 'Career Objective',
      renderItem: (item) => {
        if (!item) return null;
        return (
          <div>
            <h4 className="font-semibold">Career Objective</h4>
            <p className="text-gray-700">{item.objective}</p>
          </div>
        );
      },
    },
    {
      key: 'education',
      title: 'Education',
      renderItem: (item) => {
        if (!item) return null;
        return (
          <div>
            <h4 className="font-semibold">{item.degreeName} in {item.courseName}</h4>
            <p className="text-gray-600">{item.collegeName}</p>
            <p className="text-gray-600">{item.location}</p>
            <p className="text-gray-500">
              {item.courseStartYear} - {item.courseEndYear} | GPA: {item.currentGPA}
            </p>
          </div>
        );
      },
    },
    {
      key: 'workExperience',
      title: 'Work Experience',
      renderItem: (item) => {
        if (!item) return null;
        return (
          <div>
            <h4 className="font-semibold">{item.role}</h4>
            <p className="text-gray-600">{item.organizationName}</p>
            <p className="text-gray-500">
              {item.startMonth} {item.startYear} - {item.stillWorking ? 'Present' : `${item.endMonth} ${item.endYear}`}
            </p>
            <p className="text-gray-700 mt-2">{item.description}</p>
          </div>
        );
      },
    },
    {
      key: 'projects',
      title: 'Projects',
      renderItem: (item) => {
        if (!item) return null;
        return (
          <div>
            <h4 className="font-semibold">{item.projectName}</h4>
            <p className="text-gray-700">{item.projectTags}</p>
            <p className="text-gray-500">{item.month} {item.year}</p>
            <p className="text-gray-700">{item.projectDescription}</p>
            {item.projectLink && (
              <a href={item.projectLink} target="_blank" rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                Project Link
              </a>
            )}
          </div>
        );
      },
    },
    {
      key: 'skills',
      title: 'Skills',
      renderItem: (item) => {
        if (!item) return null;
        return (
          <div>
            <h4 className="font-semibold">{item.skill}</h4>
          </div>
        );
      },
    },
    {
      key: 'achievements',
      title: 'Achievements',
      renderItem: (item) => {
        if (!item) return null;
        return (
          <div>
            <h4 className="font-semibold">{item.achievement}</h4>
          </div>
        );
      },
    },
    {
      key: 'extraCurricular',
      title: 'Extracurriculars',
      renderItem: (item) => {
        if (!item) return null;
        return (
          <div>
            <h4 className="font-semibold">{item.activity}</h4>
          </div>
        );
      },
    },
  ];

  return sections;
}