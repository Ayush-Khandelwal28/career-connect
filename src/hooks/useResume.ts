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

  const updateItem = (section: keyof ResumeData, data: string | object, index: number | null = null) => {
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

  return {
    resumeData,
    updateItem,
    deleteItem,
    setResumeData: setResumeData,
  };
}