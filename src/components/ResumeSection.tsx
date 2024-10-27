import React from 'react';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

interface ResumeSectionProps {
    title: string;
    content: any; // Content for the specific section
    sectionKey: string; // Differentiator for the section (e.g., 'education', 'workExperience', etc.)
    onAdd?: () => void;
    onEdit?: (index: number) => void; // Modified to pass index
    onDelete?: (index: number) => void; // Modified to pass index
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
    title,
    content,
    sectionKey,
    onAdd,
    onEdit,
    onDelete,
}) => {

    const renderContent = () => {
        // Check if content is null or empty array
        if (!content || (Array.isArray(content) && content.length === 0)) {
            return <p>No {title.toLowerCase()} added</p>;
        }

        // Render array content
        if (Array.isArray(content)) {
            return content.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                    <div className="w-3/4">
                        {renderItem(item)}
                    </div>
                    <div className="w-1/4 flex justify-end space-x-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(index)}
                                className="text-yellow-600 flex items-center space-x-1 hover:text-yellow-800"
                            >
                                <FiEdit className="w-4 h-4" />
                                <span>Edit</span>
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(index)}
                                className="text-red-600 flex items-center space-x-1 hover:text-red-800"
                            >
                                <FiTrash className="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        )}
                    </div>
                </div>
            ));
        }

        // Render single item content
        return (
            <div className="flex items-center justify-between">
                <div className="w-3/4">{renderItem(content)}</div>
                <div className="w-1/4 flex justify-end space-x-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(0)}
                            className="text-yellow-600 flex items-center space-x-1 hover:text-yellow-800"
                        >
                            <FiEdit className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(0)}
                            className="text-red-600 flex items-center space-x-1 hover:text-red-800"
                        >
                            <FiTrash className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const renderItem = (item: any) => {
        switch (sectionKey) {
            case 'education':
                return (
                    <>
                        <p><strong>College:</strong> {item.collegeName}</p>
                        <p><strong>Degree:</strong> {item.degreeName} in {item.courseName}</p>
                        <p><strong>Years:</strong> {item.courseStartYear} - {item.courseEndYear}</p>
                        <p><strong>GPA:</strong> {item.currentGPA}</p>
                    </>
                );
            case 'workExperience':
                return (
                    <>
                        <p><strong>Job Title:</strong> {item.role}</p>
                        <p><strong>Company:</strong> {item.organizationName}</p>
                        <p><strong>Years:</strong> {item.startDate} - {item.endDate}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                    </>
                );
            case 'projects':
                return (
                    <>
                        <p><strong>Project:</strong> {item.projectName}</p>
                        <p><strong>Description:</strong> {item.projectDescription}</p>
                        <p><strong>Link:</strong> <a href={item.projectLink} target="_blank" rel="noopener noreferrer">{item.projectLink}</a></p>
                        <p><strong>Date:</strong> {item.month} {item.year}</p>
                    </>
                );
            case 'careerObjective':
                return <p>{item}</p>;
            default:
                return <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(item, null, 2)}</pre>;
        }
    };

    return (
        <div className="flex flex-col space-y-4 p-4 border-b border-gray-200">
            <div className="flex">
                <div className="w-1/4 text-gray-600 font-semibold">
                    <h3>{title}</h3>
                </div>
                <div className="w-3/4">
                    {renderContent()}
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="text-blue-600 flex items-center space-x-1 hover:text-blue-800"
                    >
                        <FiPlus className="w-4 h-4" />
                       <span>Add {title.toLowerCase()}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResumeSection;
