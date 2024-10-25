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

const ResumePage = () => {
    const { modal, closeModal, openModal } = useModal();

    const sections = [
        {
            title: "Career Objective",
            component: <CareerObjective />
        },
        {
            title: "Education",
            component: <Education />
        },
        {
            title: "Work Experience",
            component: <WorkExperience />
        },
        {
            title: "Projects",
            component: <Project />
        },
        {
            title: "Achievements",
            component: <Achievements />
        },
        {
            title: "Skills",
            component: <Skills />
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
                        content=""
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
