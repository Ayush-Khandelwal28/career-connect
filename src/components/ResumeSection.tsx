"use client";

import React from 'react';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

interface ResumeSectionProps {
  title: string; 
  subtitle?: string;  
  content: string | string[];  
  onAdd?: () => void; 
  onEdit?: () => void;  
  onDelete?: () => void;
  allowMultiple?: boolean;  
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, subtitle, content, onAdd, onEdit, onDelete, allowMultiple = true }) => {

  return (
    <div className="flex flex-col space-y-4 p-4 border-b border-gray-200">
      <div className="flex">
        <div className="w-1/4 text-gray-600 font-semibold">
          <h3>{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        <div className="w-3/4">
          {Array.isArray(content) ? (
            content.map((item, index) => (
              <div key={index} className="relative mb-4">
                <div className="pr-10">
                  <p>{item}</p>
                </div>

                <div className="absolute top-0 right-0 flex space-x-2">
                  {onEdit && (
                    <button onClick={() => onEdit()} className="text-blue-600 hover:text-blue-800">
                      <FiEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete()} className="text-red-600 hover:text-red-800">
                      <FiTrash />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="relative mb-4">
              <div className="pr-10">
                <p>{content}</p>
              </div>

              <div className="absolute top-0 right-0 flex space-x-2">
                {onEdit && (
                  <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                    <FiEdit />
                  </button>
                )}
                {onDelete && (
                  <button onClick={onDelete} className="text-red-600 hover:text-red-800">
                    <FiTrash />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {onAdd && (allowMultiple || (Array.isArray(content) ? content.length === 0 : typeof content === 'string' && content.length === 0)) && (
        <div className="flex justify-end">
          <button onClick={onAdd} className="text-blue-600 flex items-center space-x-1 hover:text-blue-800">
            <FiPlus /> <span>Add {title.toLowerCase()}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeSection;
