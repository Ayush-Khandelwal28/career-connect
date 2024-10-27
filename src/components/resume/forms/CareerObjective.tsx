import React, { useState, useEffect, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';

interface CareerObjectiveProps {
    onClose: () => void; 
    initialObjectives?: string[]; 
}

const CareerObjective = forwardRef<HTMLFormElement, CareerObjectiveProps>(
    ({ onClose, initialObjectives = [] }, ref) => {
        const { updateSection } = useResume();
        const [text, setText] = useState('');
        const [careerObjectives, setCareerObjectives] = useState<string[]>(initialObjectives); 

        useEffect(() => {
            setCareerObjectives(initialObjectives); 
        }, [initialObjectives]);

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            const updatedObjectives = [...careerObjectives, text]; 
            updateSection('careerObjective', updatedObjectives); 
            setCareerObjectives(updatedObjectives); 
            setText(''); 
            onClose(); 
        };

        return (
            <div>
                <form className="space-y-4" ref={ref} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="text"
                            value={text} // Bind the value to the state
                            onChange={(e) => setText(e.target.value)} // Update state on change
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
