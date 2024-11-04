import { ResumeData } from '../../types';

interface Section {
  key: keyof ResumeData;
  title: string;
  renderItem: (item: any) => React.ReactNode;
}

export function useSections(): Section[] {
  return [
    {
      key: 'careerObjective',
      title: 'Career Objective',
      renderItem: (item) => <p className="text-gray-700">{item.objective}</p>,
    },
    {
      key: 'education',
      title: 'Education',
      renderItem: (item) => (
        <div>
          <h4 className="font-semibold">{item.degreeName} in {item.courseName}</h4>
          <p className="text-gray-600">{item.collegeName}</p>
          <p className="text-gray-500">
            {item.courseStartYear} - {item.courseEndYear} | GPA: {item.currentGPA}
          </p>
        </div>
      ),
    },
    {
      key: 'workExperience',
      title: 'Work Experience',
      renderItem: (item) => (
        <div>
          <h4 className="font-semibold">{item.role}</h4>
          <p className="text-gray-600">{item.organizationName}</p>
          <p className="text-gray-500">
            {item.startMonth} {item.startYear} - {item.stillWorking ? 'Present' : `${item.endMonth} ${item.endYear}`}
          </p>
          <p className="text-gray-700 mt-2">{item.description}</p>
        </div>
      ),
    },
    {
      key: 'projects',
      title: 'Projects',
      renderItem: (item) => (
        <div>
          <h4 className="font-semibold">{item.projectName}</h4>
          <p className="text-gray-500">{item.month} {item.year}</p>
          <p className="text-gray-700">{item.projectDescription}</p>
          {item.projectLink && (
            <a href={item.projectLink} target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 hover:underline">
              Project Link
            </a>
          )}
        </div>
      ),
    },
    {
      key: 'skills',
      title: 'Skills',
      renderItem: (item) => (
        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {item}
        </span>
      ),
    },
    {
      key: 'achievements',
      title: 'Achievements',
      renderItem: (item) => <p className="text-gray-700">{item}</p>,
    },
  ];
}