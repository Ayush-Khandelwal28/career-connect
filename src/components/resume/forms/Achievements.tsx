import { Label } from '@/components/ui/label';
import { FormProps } from '../../../types/index';

export function AchievementForm({ formData, setFormData }: FormProps) {
  return (
    <div>
      <Label htmlFor="achievement">Achievement</Label>
      <textarea
        id="achievement"
        name="achievement"
        value={formData}
        onChange={(e) => setFormData?.(e.target.value)}
        className="w-full min-h-[100px] p-2 border rounded"
        required
      />
    </div>
  );
}