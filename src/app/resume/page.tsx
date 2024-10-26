"use client";

import ResumeSection from '../../components/ResumeSection';
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
            component: <CareerObjective />,
            content: resumeData.careerObjective ? resumeData.careerObjective : "No career objective added",
        },
        {
            title: "Education",
            component: <Education />,
            content: resumeData.education.length > 0 ? resumeData.education : "No education added",
        },
        {
            title: "Work Experience",
            component: <WorkExperience />,
            content: resumeData.workExperience.length > 0 ? resumeData.workExperience : "No work experience added",
        },
        {
            title: "Projects",
            component: <Project />,
            content: resumeData.projects.length > 0 ? resumeData.projects : "No projects added",
        },
        {
            title: "Achievements",
            component: <Achievements />,
            content: resumeData.achievements.length > 0 ? resumeData.achievements : "No achievements added",
        },
        {
            title: "Skills",
            component: <Skills />,
            content: resumeData.skills.length > 0 ? resumeData.skills : "No skills added",
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
                        key={index}
                        title={section.title}
                        content={section.content}
                        onAdd={() => openModal(ModalComponent)}
                        onEdit={() => openModal(ModalComponent)}
                        onDelete={() => console.log(`Delete ${section.title}`)}
                        allowMultiple={false}
                    />
                );
            })}
        </div>
    );
};

export default ResumePage;
