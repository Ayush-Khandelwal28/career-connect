import React, { useState, forwardRef } from 'react';
import { useResume } from '../../../app/context/ResumeContext';

const Achievements = forwardRef<HTMLFormElement, { onClose: () => void }>(({ onClose }, ref) => {
  const [achievement, setAchievement] = useState('');
  const { resumeData, updateSection } = useResume();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const updatedAchievements = [...resumeData.achievements, achievement];
    updateSection('achievements', updatedAchievements);
    
    alert('Achievement details submitted successfully!');
    setAchievement(''); 
    
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
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter your achievement"
          />
        </div>
        <button type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
});

export default Achievements;
