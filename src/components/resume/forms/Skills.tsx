import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormProps } from '../../../types/index';

export function SkillForm({ formData, setFormData }: FormProps) {
  return (
    <div>
      <Label htmlFor="skill">Skill</Label>
      <Input
        id="skill"
        name="skill"
        value={formData}
        onChange={(e) => setFormData?.(e.target.value)}
        required
      />
    </div>
  );
}

