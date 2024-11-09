import { ResumeData } from '../../types';
import ResumeSection from './ResumeSection';
import { useSections } from './sections';

interface ResumeSectionListProps {
  resumeData?: ResumeData;
  onAdd: (section: keyof ResumeData) => void;
  onEdit: (section: keyof ResumeData, index: number) => void;
  onDelete: (section: keyof ResumeData, index: number) => void;
}

const defaultResumeData: ResumeData = {
  careerObjective: [],
  education: [],
  workExperience: [],
  projects: [],
  achievements: [],
  skills: [],
};

export function ResumeSectionList({
  resumeData = defaultResumeData,
  onAdd,
  onEdit,
  onDelete,
}: ResumeSectionListProps) {
  const sections = useSections();

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const key = section.key;
        const items = resumeData[key] ?? [];
        
        return (
          <ResumeSection
            key={key}
            title={section.title}
            items={items}
            onAdd={() => onAdd(key)}
            onEdit={(index) => onEdit(key, index)}
            onDelete={(index) => onDelete(key, index)}
            renderItem={section.renderItem as (item: typeof items[0]) => React.ReactNode}
          />
        );
      })}
    </div>
  );
}