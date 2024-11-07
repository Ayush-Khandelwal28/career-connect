import { ResumeData } from '../types';

export function getInitialFormData(section: keyof ResumeData) {
  switch (section) {
    case 'careerObjective':
      return { objective: '' };
    case 'education':
      return {
        collegeName: '',
        degreeName: '',
        courseName: '',
        courseStartYear: '',
        courseEndYear: '',
        currentGPA: '',
      };
    case 'workExperience':
      return {
        role: '',
        organizationName: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        description: '',
        stillWorking: false,
      };
    case 'projects':
      return {
        projectName: '',
        projectDescription: '',
        projectLink: '',
        month: '',
        year: '',
      };
    case 'skills':
      return {
        skill: '',
      }
    case 'achievements':
      return {
        achievement: '',
      }
    default:
      return {};
  }
}

export function formatSectionTitle(section: string) {
  return section
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}