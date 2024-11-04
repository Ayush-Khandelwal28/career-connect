import { ResumeData } from '../../types';
import ResumeSection from './ResumeSection';
import { useSections } from './sections';

interface ResumeSectionListProps {
  resumeData: ResumeData;
  onAdd: (section: keyof ResumeData) => void;
  onEdit: (section: keyof ResumeData, index: number) => void;
  onDelete: (section: keyof ResumeData, index: number) => void;
}

export function ResumeSectionList({
  resumeData,
  onAdd,
  onEdit,
  onDelete,
}: ResumeSectionListProps) {
  const sections = useSections();

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <ResumeSection
          key={section.key}
          title={section.title}
          items={resumeData[section.key as keyof ResumeData]}
          onAdd={() => onAdd(section.key as keyof ResumeData)}
          onEdit={(index) => onEdit(section.key as keyof ResumeData, index)}
          onDelete={(index) => onDelete(section.key as keyof ResumeData, index)}
          renderItem={section.renderItem}
        />
      ))}
    </div>
  );
}