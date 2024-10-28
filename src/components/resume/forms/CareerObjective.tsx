import React, { useState, useEffect, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';
import { careerObjectiveInterface } from '@/types';

interface CareerObjectiveProps {
    onClose: () => void;
    initialData?: careerObjectiveInterface[];
    isEditMode?: boolean;
    editIndex?: number;
}

const CareerObjective = forwardRef<HTMLFormElement, CareerObjectiveProps>(
    ({ onClose, initialData = [], isEditMode = false, editIndex }, ref) => {
        const { resumeData, updateSection, updateItem } = useResume();
        const [careerObjective, setCareerObjective] = useState('');
        const [careerObjectives, setCareerObjectives] = useState<careerObjectiveInterface[]>([]); // Fix: initialize with an empty array

        useEffect(() => {
            if (isEditMode && initialData && editIndex !== undefined) {
                setCareerObjective(initialData[editIndex]?.objective || '');
            }
        }, [initialData, isEditMode, editIndex]);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setCareerObjective(event.target.value);
        };

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();

            const newObjective: careerObjectiveInterface = { objective: careerObjective };
            let updatedObjectives = [...careerObjectives];

            if (isEditMode && editIndex !== undefined && editIndex >= 0) {
                updatedObjectives[editIndex] = newObjective;
                updateItem('careerObjective', editIndex, newObjective);
            } else {
                updatedObjectives = [...careerObjectives, newObjective];
                updateSection('careerObjective', updatedObjectives);
            }

            setCareerObjectives(updatedObjectives); 
            setCareerObjective('');
            onClose(); 
        };

        return (
            <div>
                <form className="space-y-4" ref={ref} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="careerObjective"
                            value={careerObjective}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                            placeholder="My career objective is to..."
                        />
                    </div>
                    <button type="submit" style={{ display: 'none' }} />
                </form>
            </div>
        );
    }
);

export default CareerObjective;
