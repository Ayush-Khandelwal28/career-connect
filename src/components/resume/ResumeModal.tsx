import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ResumeData, CareerObjectiveInterface, EducationInterface, WorkExperienceInterface, ProjectInterface, SkillInterface, AchievementInterface, FormProps } from '../../types/index';
import { getInitialFormData, formatSectionTitle } from '../../utils/resume';
import { CareerObjectiveForm } from '../resume/forms/CareerObjective';
import { EducationForm } from '../resume/forms/Education';
import { WorkExperienceForm } from '../resume/forms/WorkExperience';
import { ProjectForm } from '../resume/forms/Projects';
import { SkillForm } from '../resume/forms/Skills';
import { AchievementForm } from '../resume/forms/Achievements';

type SectionData = ResumeData[keyof ResumeData];

interface ResumeModalProps<T> {
  section: keyof ResumeData;
  initialData?: T;
  onSave: (data: T) => void;
  onClose: () => void;
}

function ResumeModal<T extends SectionData>({
  section,
  initialData,
  onSave,
  onClose,
}: ResumeModalProps<T>) {
  const [formData, setFormData] = useState<T>(initialData || getInitialFormData(section) as T);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const renderForm = () => {
    const commonProps = {
      formData,
      handleInputChange,
      handleCheckboxChange,
      setFormData,
    };

    switch (section) {
      case 'careerObjective':
        return <CareerObjectiveForm {...(commonProps as unknown as FormProps<CareerObjectiveInterface>)} />;
      case 'education':
        return <EducationForm {...(commonProps as unknown as FormProps<EducationInterface>)} />;
      case 'workExperience':
        return <WorkExperienceForm {...(commonProps as unknown as FormProps<WorkExperienceInterface>)} />;
      case 'projects':
        return <ProjectForm {...(commonProps as unknown as FormProps<ProjectInterface>)} />;
      case 'skills':
        return <SkillForm {...(commonProps as unknown as FormProps<SkillInterface>)} />;
      case 'achievements':
        return <AchievementForm {...(commonProps as unknown as FormProps<AchievementInterface>)} />;
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
