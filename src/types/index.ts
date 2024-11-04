import { ChangeEvent } from 'react';

export interface CareerObjectiveInterface {
  objective: string;
}

export interface EducationInterface {
  collegeName: string;
  degreeName: string;
  courseName: string;
  courseStartYear: string;
  courseEndYear: string;
  currentGPA: string;
}

export interface WorkExperienceInterface {
  role: string;
  organizationName: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
  stillWorking: boolean;
}

export interface ProjectInterface {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  month: string;
  year: string;
}

export interface SkillInterface {
  skills: string[];
}

export interface AchievementInterface {
  achievement: string;
}

export interface ResumeData {
  careerObjective: CareerObjectiveInterface[];
  education: EducationInterface[];
  workExperience: WorkExperienceInterface[];
  projects: ProjectInterface[];
  achievements: string[];
  skills: string[];
}

export interface FormProps {
  formData: any;
  handleInputChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange?: (name: string, checked: boolean) => void;
  setFormData?: (value: any) => void;
}