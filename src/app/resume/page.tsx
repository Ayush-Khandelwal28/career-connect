"use client";

import ResumeSection from '@/components/ResumeSection';
import ResumeModal from '../../components/resume/ResumeModal';
import CareerObjective from '../../components/resume/forms/CareerObjective';
import Education from '../../components/resume/forms/Education';
import WorkExperience from '../../components/resume/forms/WorkExperience';
import Project from '../../components/resume/forms/Projects';
import Achievements from '../../components/resume/forms/Achievements';
import Skills from '../../components/resume/forms/Skills';
import useModal from '../hooks/useModal';
import { useResume } from '../context/ResumeContext';

const ResumePage = () => {
    const { modal, closeModal, openModal } = useModal();
    const { resumeData } = useResume();

    const sections = [
        {
            title: "Career Objective",
            key: "careerObjective",
            component: <CareerObjective onClose={closeModal} />,
            content: resumeData.careerObjective || null, // Pass null if no content
            allowMultiple: false,
        },
        {
            title: "Education",
            key: "education",
            component: <Education onClose={closeModal} />,
            content: resumeData.education.length > 0 ? resumeData.education : null, // Pass null if empty
            allowMultiple: true,
        },
        {
            title: "Work Experience",
            key: "workExperience",
            component: <WorkExperience onClose={closeModal} />,
            content: resumeData.workExperience.length > 0 ? resumeData.workExperience : null, // Pass null if empty
            allowMultiple: true,
        },
        {
            title: "Projects",
            key: "projects",
            component: <Project onClose={closeModal} />,
            content: resumeData.projects.length > 0 ? resumeData.projects : null, // Pass null if empty
            allowMultiple: true,
        },
        {
            title: "Achievements",
            key: "achievements",
            component: <Achievements onClose={closeModal} />,
            content: resumeData.achievements.length > 0 ? resumeData.achievements : null, // Pass null if empty
            allowMultiple: true,
        },
        {
            title: "Skills",
            key: "skills",
            component: <Skills onClose={closeModal} />,
            content: resumeData.skills.length > 0 ? resumeData.skills : null, // Pass null if empty
            allowMultiple: true,
        },
    ];

    return (
        <div className="p-6 bg-gray-50 max-w-4xl mx-auto">
            {modal}
            <h1 className="text-3xl font-bold mb-6">Your Resume</h1>
            {sections.map((section, index) => {
                const ModalComponent = (
                    <ResumeModal
                        isOpen={true}
                        onClose={closeModal}
                        dialogTitle={section.title}
                        formComponent={section.component}
                    />
                );

                return (
                    <ResumeSection
                        title={section.title}
                        key={section.key}
                        sectionKey={section.key}
                        content={section.content}
                        onAdd={() => openModal(ModalComponent)}
                        onEdit={() => openModal(ModalComponent)}
                        onDelete={() => console.log(`Delete ${section.title}`)}
                        allowMultiple={section.allowMultiple}
                    />
                );
            })}
        </div>
    );
};

export default ResumePage;
