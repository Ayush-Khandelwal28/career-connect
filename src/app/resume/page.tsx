"use client";
import React, { useState } from 'react';
import ResumeSection from '@/components/resume/ResumeSection';
import ResumeModal from '../../components/resume/ResumeModal';
import useModal from '../hooks/useModal';
import { useResume } from '../context/ResumeContext';
import { useSectionsList } from '@/components/resume/sections';

const ResumePage = () => {
    const { modal, closeModal, openModal } = useModal();
    const { resumeData, updateItem, deleteItem } = useResume();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editSectionKey, setEditSectionKey] = useState<string | null>(null);

    const sectionsList = useSectionsList();

    const handleEdit = (sectionKey: string, index: number) => {
        const initialData = resumeData[sectionKey][index]; 
        setEditIndex(index);
        setEditSectionKey(sectionKey);

        const section = sectionsList.find((sec) => sec.key === sectionKey);
        if (section) {
            openModal(
                <ResumeModal
                    isOpen={true}
                    onClose={closeModal}
                    dialogTitle={`Edit ${section.title}`} 
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
                    editIndex={index} 
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
            {sectionsList.map((section) => {
                const ModalComponent = (
                    <ResumeModal
                        isOpen={true}
                        onClose={closeModal}
                        dialogTitle={section.title}
                        formComponent={section.component(null)}
                        isEditMode={false}
                        editIndex={null}
                    />
                );

                return (
                    <ResumeSection
                        title={section.title}
                        key={section.key}
                        sectionKey={section.key}
                        content={section.content}
                        onAdd={() => openModal(ModalComponent)}
                        onEdit={(index: number) => handleEdit(section.key as keyof typeof resumeData, index)} 
                        onDelete={(index: number) => handleDelete(section.key as keyof typeof resumeData, index)} 
                    />
                );
            })}
        </div>
    );
};

export default ResumePage;
