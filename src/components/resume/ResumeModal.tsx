"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ResumeData } from '../../types/index';
import { getInitialFormData, formatSectionTitle } from '../../utils/resume';
import { CareerObjectiveForm } from '../resume/forms/CareerObjective';
import { EducationForm } from '../resume/forms/Education';
import { WorkExperienceForm } from '../resume/forms/WorkExperience';
import { ProjectForm } from '../resume/forms/Projects';
import { SkillForm } from '../resume/forms/Skills';
import { AchievementForm } from '../resume/forms/Achievements';

interface ResumeModalProps {
  section: keyof ResumeData;
  initialData?: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

function ResumeModal({ section, initialData, onSave, onClose }: ResumeModalProps) {
  const [formData, setFormData] = useState(initialData || getInitialFormData(section));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev: any) => ({ ...prev, [name]: checked }));
  };

  const renderForm = () => {
    const props = {
      formData,
      handleInputChange,
      handleCheckboxChange,
      setFormData,
    };

    switch (section) {
      case 'careerObjective':
        return <CareerObjectiveForm {...props} />;
      case 'education':
        return <EducationForm {...props} />;
      case 'workExperience':
        return <WorkExperienceForm {...props} />;
      case 'projects':
        return <ProjectForm {...props} />;
      case 'skills':
        return <SkillForm {...props} />;
      case 'achievements':
        return <AchievementForm {...props} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit' : 'Add'} {formatSectionTitle(section)}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeModal;