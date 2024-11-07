import { Label } from '@/components/ui/label';
import { AchievementInterface, FormProps } from '../../../types/index';

export function AchievementForm({ formData, handleInputChange }: FormProps<AchievementInterface>) {
  return (
    <div>
      <Label htmlFor="achievement">Achievement</Label>
      <textarea
        id="achievement"
        name="achievement"
        value={formData.achievement}
        onChange={handleInputChange}
        className="w-full min-h-[100px] p-2 border rounded"
        required
      />
    </div>
  );
}
