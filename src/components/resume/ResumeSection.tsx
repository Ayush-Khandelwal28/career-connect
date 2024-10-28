import React from 'react';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

interface ResumeSectionProps {
    title: string;
    content: any;
    sectionKey: string;
    onAdd?: () => void;
    onEdit?: (index: number) => void;
    onDelete?: (index: number) => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
    title,
    content,
    sectionKey,
    onAdd,
    onEdit,
    onDelete,
}) => {

    const ActionButton = ({
        label,
        onClick,
        Icon,
        className
    }: {
        label: string;
        onClick: () => void;
        Icon: React.ElementType;
        className: string;
    }) => (
        <button
            onClick={onClick}
            className={`flex items-center space-x-1 ${className}`}
        >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
        </button>
    );

    const renderItem = (item: any) => {
        const commonFields: { [key: string]: JSX.Element } = {
            careerObjective: <p>{item.objective}</p>,
            education: (
                <>
                    <p><strong>College:</strong> {item.collegeName}</p>
                    <p><strong>Degree:</strong> {item.degreeName} in {item.courseName}</p>
                    <p><strong>Years:</strong> {item.courseStartYear} - {item.courseEndYear}</p>
                    <p><strong>GPA:</strong> {item.currentGPA}</p>
                </>
            ),
            workExperience: (
                <>
                    <p><strong>Job Title:</strong> {item.role}</p>
                    <p><strong>Company:</strong> {item.organizationName}</p>
                    <p><strong>Years:</strong> {item.startDate} - {item.endDate}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                </>
            ),
            projects: (
                <>
                    <p><strong>Project:</strong> {item.projectName}</p>
                    <p><strong>Description:</strong> {item.projectDescription}</p>
                    <p><strong>Link:</strong> <a href={item.projectLink} target="_blank" rel="noopener noreferrer">{item.projectLink}</a></p>
                    <p><strong>Date:</strong> {item.month} {item.year}</p>
                </>
            ),
            achievements: <p>{item.achievement}</p>,
            skills: <p>{item.skill}</p>,
        };

        return commonFields[sectionKey] || <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(item, null, 2)}</pre>;
    };

    // Function to handle rendering content with edit/delete options
    const renderContent = () => {
        if (!content || (Array.isArray(content) && content.length === 0)) {
            return <p>No {title.toLowerCase()} added</p>;
        }

        const renderActionButtons = (index: number) => (
            <div className="w-1/4 flex justify-end space-x-2">
                {onEdit && <ActionButton label="Edit" onClick={() => onEdit(index)} Icon={FiEdit} className="text-yellow-600 hover:text-yellow-800" />}
                {onDelete && <ActionButton label="Delete" onClick={() => onDelete(index)} Icon={FiTrash} className="text-red-600 hover:text-red-800" />}
            </div>
        );

        return Array.isArray(content)
            ? content.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                    <div className="w-3/4">{renderItem(item)}</div>
                    {renderActionButtons(index)}
                </div>
              ))
            : (
                <div className="flex items-center justify-between">
                    <div className="w-3/4">{renderItem(content)}</div>
                    {renderActionButtons(0)}
                </div>
              );
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
            {onAdd && (
                <div className="flex justify-end space-x-4">
                    <ActionButton
                        label={`Add ${title.toLowerCase()}`}
                        onClick={onAdd}
                        Icon={FiPlus}
                        className="text-blue-600 hover:text-blue-800"
                    />
                </div>
            )}
        </div>
    );
};

export default ResumeSection;
