"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { careerObjectiveInterface, EducationInterface, WorkExperienceInterface, ProjectInterface, AchievementInterface, SkillInterface } from '@/types';

interface ResumeData {
    careerObjective: careerObjectiveInterface[];
    education: EducationInterface[]; 
    workExperience: WorkExperienceInterface[];  
    projects: ProjectInterface[];
    achievements: AchievementInterface[];
    skills: SkillInterface[];
}

interface ResumeContextType {
    resumeData: ResumeData;
    updateSection: (section: keyof ResumeData, data: any) => void; 
    updateItem: (section: keyof ResumeData, index: number, updatedItem: any) => void; 
    deleteItem: (section: keyof ResumeData, index: number) => void; 
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

interface ResumeProviderProps {
    children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
    const [resumeData, setResumeData] = useState<ResumeData>({
        careerObjective: [],
        education: [],
        workExperience: [],
        projects: [],
        achievements: [],
        skills: []
    });

    const updateSection = (section: keyof ResumeData, data: any) => {
        setResumeData((prevData) => ({
            ...prevData,
            [section]: data
        }));
    };

    const updateItem = (section: keyof ResumeData, index: number, updatedItem: any) => {
        setResumeData((prevData) => {
            const updatedSection = [...(prevData[section] as any[])]; 
            updatedSection[index] = updatedItem; 
            return {
                ...prevData,
                [section]: updatedSection
            };
        });
    };

    const deleteItem = (section: keyof ResumeData, index: number) => {
        setResumeData((prevData) => {
            const updatedSection = [...prevData[section]]; 
            updatedSection.splice(index, 1);
            return {
                ...prevData,
                [section]: updatedSection
            };
        });
    };

    console.log('current resume data:', resumeData);

    return (
        <ResumeContext.Provider value={{ resumeData, updateSection, updateItem, deleteItem }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = (): ResumeContextType => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
