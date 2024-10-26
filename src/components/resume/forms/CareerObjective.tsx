import React, { useState, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';

interface CareerObjectiveProps {
    onClose: () => void; // Accept onClose as a prop
}

const CareerObjective = forwardRef<HTMLFormElement, CareerObjectiveProps>(({ onClose }, ref) => {
    const [text, setText] = useState('');
    const { updateSection } = useResume();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); 
        updateSection('careerObjective', text); 
        alert('Career objective submitted successfully!'); 
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
});

export default CareerObjective;
