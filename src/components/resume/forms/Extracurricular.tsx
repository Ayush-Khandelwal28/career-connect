import { Label } from '@/components/ui/label';
import { ExtraCurricularInterface, FormProps } from '../../../types/index';

export function ExtracurricularForm({ formData, handleInputChange }: FormProps<ExtraCurricularInterface>) {
  return (
    <div>
      <Label htmlFor="activity">Activity</Label>
      <textarea
        id="activity"
        name="activity"
        value={formData.activity}
        onChange={handleInputChange}
        className="w-full min-h-[100px] p-2 border rounded"
        required
      />
    </div>
  );
}
