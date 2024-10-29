"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
    careerObjectiveInterface,
    EducationInterface,
    WorkExperienceInterface,
    ProjectInterface,
    AchievementInterface,
    SkillInterface
} from '@/types';

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
    sendResumeData: () => Promise<void>; // Add the function signature
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

    const sendResumeData = async () => {
        try {
            const response = await fetch('/api/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resumeData),
            });

            if (!response.ok) {
                throw new Error('Failed to send resume data');
            }

            const result = await response.json();
            console.log('Resume data sent successfully:', result);
        } catch (error) {
            console.error('Error sending resume data:', error);
        }
    };

    console.log('Current resume data:', resumeData);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const response = await fetch('/api/getResume');
                if (!response.ok) throw new Error('Failed to fetch resume data');

                const data = await response.json();
                setResumeData(data);
                console.log('Resume data fetched successfully:', data);
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        };

        fetchResumeData();
    }, []);

    return (
        <ResumeContext.Provider value={{ resumeData, updateSection, updateItem, deleteItem, sendResumeData }}>
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
