import React, { useState } from 'react';
import CareerObjective from '../../components/resume/forms/CareerObjective';
import Education from '../../components/resume/forms/Education';
import WorkExperience from '../../components/resume/forms/WorkExperience';
import Project from '../../components/resume/forms/Projects';
import Achievements from '../../components/resume/forms/Achievements';
import Skills from '../../components/resume/forms/Skills';

import { useResume } from '../../app/context/ResumeContext';
import useModal from '../../app/hooks/useModal';

import { careerObjectiveInterface, EducationInterface, WorkExperienceInterface, ProjectInterface, AchievementInterface, SkillInterface } from '@/types';

export const useSectionsList = () => {
    const { resumeData } = useResume();
    const { closeModal } = useModal();

    const [editIndex, setEditIndex] = useState<number | null>(null);

    return [
        {
            title: "Career Objective",
            key: "careerObjective",
            component: (initialData : careerObjectiveInterface[]) => <CareerObjective onClose={closeModal} initialData={initialData} />,
            content: resumeData.careerObjective.length > 0 ? resumeData.careerObjective : null
        },
        {
            title: "Education",
            key: "education",
            component: (initialData : EducationInterface) => <Education onClose={closeModal} initialData={initialData} isEditMode={editIndex !== null} editIndex={editIndex ?? undefined} />,
            content: resumeData.education.length > 0 ? resumeData.education : null
        },
        {
            title: "Work Experience",
            key: "workExperience",
            component: (initialData : WorkExperienceInterface) => <WorkExperience onClose={closeModal} initialData={initialData} />,
            content: resumeData.workExperience.length > 0 ? resumeData.workExperience : null
        },
        {
            title: "Projects",
            key: "projects",
            component: (initialData : ProjectInterface) => <Project onClose={closeModal} initialData={initialData} />,
            content: resumeData.projects.length > 0 ? resumeData.projects : null
        },
        {
            title: "Achievements",
            key: "achievements",
            component: (initialData : AchievementInterface) => <Achievements onClose={closeModal} initialData={initialData} />,
            content: resumeData.achievements.length > 0 ? resumeData.achievements : null
        },
        {
            title: "Skills",
            key: "skills",
            component: (initialData : SkillInterface) => <Skills onClose={closeModal} initialData={initialData} />,
            content: resumeData.skills.length > 0 ? resumeData.skills : null
        },
    ];
};
