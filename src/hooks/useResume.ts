"use client";

import { useState } from 'react';
import { ResumeData } from '../types/index';

const initialResumeData: ResumeData = {
  careerObjective: [],
  education: [],
  workExperience: [],
  projects: [],
  achievements: [],
  skills: [],
};

export const useResume = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updateItem = (section: keyof ResumeData, data: any, index: number | null = null) => {
    setResumeData((prev) => ({
      ...prev,
      [section]:
        index !== null
          ? prev[section].map((item, i) => (i === index ? data : item))
          : [...prev[section], data],
    }));
  };

  const deleteItem = (section: keyof ResumeData, index: number) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const setResumeDataDirectly = (data: ResumeData) => {
    if (data.skills && Array.isArray(data.skills) && data.skills.every(skillObj => typeof skillObj === 'object' && 'skill' in skillObj)) {
      data.skills = data.skills.map((skillObj: { skill: string }) => skillObj.skill);
    }
    if (data.achievements && Array.isArray(data.achievements) && data.achievements.every(achievementObj => typeof achievementObj === 'object' && 'achievement' in achievementObj)) {
      data.achievements = data.achievements.map((achievementObj: { achievement: string }) => achievementObj.achievement);
    }
    setResumeData(data);
  };

  return {
    resumeData,
    updateItem,
    deleteItem,
    setResumeData: setResumeDataDirectly, 
  };
}
