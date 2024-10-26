"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

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

interface ResumeContextType {
    resumeData: ResumeData;
    updateSection: (section: keyof ResumeData, data: any) => void; 
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

interface ResumeProviderProps {
    children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
    const [resumeData, setResumeData] = useState<ResumeData>({
        careerObjective: "",
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

    return (
        <ResumeContext.Provider value={{ resumeData, updateSection }}>
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
