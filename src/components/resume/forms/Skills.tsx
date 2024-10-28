import React, { useState, useEffect, forwardRef } from 'react';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { useResume } from '../../../app/context/ResumeContext';
import { SkillInterface } from '@/types';

interface SkillsFormProps {
    onClose: () => void;
    initialData?: SkillInterface;
}

const SkillsForm = forwardRef<HTMLFormElement, SkillsFormProps>(({ onClose, initialData }, ref) => {
    const allSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'HTML', 'SQL', 'Java', 'C++', 'AWS', 'Docker', 'Kubernetes'];
    const { resumeData, updateSection } = useResume();
    const [availableSkills, setAvailableSkills] = useState(allSkills);
    const [searchSkill, setSearchSkill] = useState('');
    const [addedSkills, setAddedSkills] = useState<SkillInterface[]>(
        initialData ? [initialData] : (resumeData.skills || [])
    );

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (initialData && initialData.skill && !addedSkills.some(skillObj => skillObj.skill === initialData.skill)) {
            setAddedSkills((prevSkills) => [...prevSkills, initialData]);
            setAvailableSkills(availableSkills.filter((s) => s !== initialData.skill));
        }
    }, [initialData]);

    const handleAddSkill = (skill: string) => {
        const newSkill: SkillInterface = { skill };
        const updatedSkills = [...addedSkills, newSkill];
        setAddedSkills(updatedSkills);
        setAvailableSkills(availableSkills.filter((s) => s !== skill));
        setSearchSkill('');
        setShowDropdown(false);

        updateSection('skills', updatedSkills); // Updating as objects with skill property
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onClose();
    };

    const filteredSkills = availableSkills.filter((skill) =>
        skill.toLowerCase().includes(searchSkill.toLowerCase())
    );

    return (
        <div>
            <form className="space-y-4" ref={ref} onSubmit={handleSubmit}>
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Search and Add Skills</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={searchSkill}
                            onChange={(e) => {
                                setSearchSkill(e.target.value);
                                setShowDropdown(e.target.value.length > 0 && filteredSkills.length > 0);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                            placeholder="Search skills"
                        />
                        <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown && filteredSkills.length > 0)}
                            className="ml-2 mt-1 px-3 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            <MdOutlineArrowDropDownCircle />
                        </button>
                    </div>

                    {showDropdown && filteredSkills.length > 0 && (
                        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {filteredSkills.map((skill, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleAddSkill(skill)}
                                    className="cursor-pointer py-2 px-4 hover:bg-blue-100 text-gray-900"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Added Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {addedSkills.map((item, index) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full"
                            >
                                {item.skill}
                            </span>
                        ))}
                    </div>
                </div>
                <button type="submit" style={{ display: 'none' }} />
            </form>
        </div>
    );
});

export default SkillsForm;
