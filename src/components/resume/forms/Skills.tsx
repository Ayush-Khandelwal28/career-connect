import React, { useState } from 'react';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const SkillsForm = () => {
    const allSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'HTML', 'SQL', 'Java', 'C++', 'AWS', 'Docker', 'Kubernetes'];
    const [availableSkills, setAvailableSkills] = useState(allSkills);
    const [searchSkill, setSearchSkill] = useState('');
    const [addedSkills, setAddedSkills] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAddSkill = (skill: string) => {
        setAddedSkills([...addedSkills, skill]);
        setAvailableSkills(availableSkills.filter((s) => s !== skill));
        setSearchSkill('');
        setShowDropdown(false);
    };

    const filteredSkills = availableSkills.filter((skill) =>
        skill.toLowerCase().includes(searchSkill.toLowerCase())
    );

    return (
        <div>
            <form className="space-y-4">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Search and Add Skills</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={searchSkill}
                            onChange={(e) => {
                                setSearchSkill(e.target.value);
                                setShowDropdown(true);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                            placeholder="Search skills"
                        />
                        <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
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
                        {addedSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SkillsForm;
