import React, { useState, useEffect, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';
import { AchievementInterface } from '@/types';

interface AchievementsProps {
  onClose: () => void;
  initialData?: AchievementInterface;
  isEditMode?: boolean;
  editIndex?: number;
}

const Achievements = forwardRef<HTMLFormElement, AchievementsProps>(
  ({ onClose, initialData, isEditMode, editIndex }, ref) => {
    const [achievement, setAchievement] = useState<AchievementInterface>({} as AchievementInterface);
    const { resumeData, updateSection, updateItem } = useResume();

    useEffect(() => {
      if (initialData) {
        setAchievement(initialData);
      }
    }, [initialData]);

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      if (isEditMode && editIndex !== undefined && editIndex >= 0) {
        const updatedAchievements = [...resumeData.achievements];
        updatedAchievements[editIndex] = achievement; 
        updateSection('achievements', updatedAchievements);
      } else {
        const updatedAchievements = [...resumeData.achievements, achievement];
        updateSection('achievements', updatedAchievements);
      }

      setAchievement({} as AchievementInterface);

      onClose();
    };

    return (
      <div>
        <form className="space-y-4" ref={ref} onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Achievement</label>
            <input
              type="text"
              name="achievement"
              value={achievement.achievement || ''}
              onChange={(e) => setAchievement({ ...achievement, achievement: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Enter your achievement"
            />
          </div>
          <button type="submit" style={{ display: 'none' }} />
        </form>
      </div>
    );
  }
);

export default Achievements;
