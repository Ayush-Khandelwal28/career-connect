"use client";
import React, { useState } from 'react';
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
    const { resumeData, updateItem, deleteItem } = useResume();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editSectionKey, setEditSectionKey] = useState<string | null>(null);

    const sections = [
        {
            title: "Career Objective",
            key: "careerObjective",
            component: (initialData) => <CareerObjective onClose={closeModal} initialData={initialData} />,
            content: resumeData.careerObjective || null
        },
        {
            title: "Education",
            key: "education",
            component: (initialData) => <Education onClose={closeModal} initialData={initialData} isEditMode={editIndex !== null} editIndex={editIndex} />,
            content: resumeData.education.length > 0 ? resumeData.education : null
        },
        {
            title: "Work Experience",
            key: "workExperience",
            component: (initialData) => <WorkExperience onClose={closeModal} initialData={initialData} />,
            content: resumeData.workExperience.length > 0 ? resumeData.workExperience : null
        },
        {
            title: "Projects",
            key: "projects",
            component: (initialData) => <Project onClose={closeModal} initialData={initialData} />,
            content: resumeData.projects.length > 0 ? resumeData.projects : null
        },
        {
            title: "Achievements",
            key: "achievements",
            component: (initialData) => <Achievements onClose={closeModal} initialData={initialData} />,
            content: resumeData.achievements.length > 0 ? resumeData.achievements : null
        },
        {
            title: "Skills",
            key: "skills",
            component: (initialData) => <Skills onClose={closeModal} initialData={initialData} />,
            content: resumeData.skills.length > 0 ? resumeData.skills : null
        },
    ];

    const handleEdit = (sectionKey: string, index: number) => {
        const initialData = resumeData[sectionKey][index]; // Fetch existing data
        setEditIndex(index);
        setEditSectionKey(sectionKey);

        const section = sections.find((sec) => sec.key === sectionKey);
        if (section) {
            openModal(
                <ResumeModal
                    isOpen={true}
                    onClose={closeModal}
                    dialogTitle={`Edit ${section.title}`} // Use section.title for a more descriptive dialog title
                    formComponent={
                        React.cloneElement(
                            section.component(initialData),
                            {
                                onClose: closeModal,
                                initialData,
                                isEditMode: true,
                                editIndex: index, 
                            }
                        )
                    }
                    isEditMode={true}
                    editIndex={index} // Add editIndex property
                />
            );
        }
    };

    const handleDelete = (sectionKey: keyof typeof resumeData, index: number) => {
        deleteItem(sectionKey, index);
    };

    return (
        <div className="p-6 bg-gray-50 max-w-4xl mx-auto">
            {modal}
            <h1 className="text-3xl font-bold mb-6">Your Resume</h1>
            {sections.map((section) => {
                const ModalComponent = (
                    <ResumeModal
                        isOpen={true}
                        onClose={closeModal}
                        dialogTitle={section.title}
                        formComponent={section.component(null)} // Pass null for empty modal
                    />
                );

                return (
                    <ResumeSection
                        title={section.title}
                        key={section.key}
                        sectionKey={section.key}
                        content={section.content}
                        onAdd={() => openModal(ModalComponent)}
                        onEdit={(index: number) => handleEdit(section.key as keyof typeof resumeData, index)} // Pass index
                        onDelete={(index: number) => handleDelete(section.key as keyof typeof resumeData, index)} // Pass index
                    />
                );
            })}
        </div>
    );
};

export default ResumePage;
