import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormProps, SkillInterface } from '../../../types/index';

export function SkillForm({ formData, handleInputChange }: FormProps<SkillInterface>) {
  return (
    <div>
      <Label htmlFor="skill">Skill</Label>
      <Input
        id="skill"
        name="skill"
        value={formData.skill}
        onChange={handleInputChange}
        required
      />
    </div>
  );
}

