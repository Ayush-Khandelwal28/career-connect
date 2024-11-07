import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FormProps, WorkExperienceInterface } from '../../../types/index';

export function WorkExperienceForm({ formData, handleInputChange, handleCheckboxChange }: FormProps<WorkExperienceInterface>) {
  return (
    <>
      <div>
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="organizationName">Organization</Label>
        <Input
          id="organizationName"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startMonth">Start Month</Label>
          <Input
            id="startMonth"
            name="startMonth"
            value={formData.startMonth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="startYear">Start Year</Label>
          <Input
            id="startYear"
            name="startYear"
            value={formData.startYear}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="stillWorking"
          checked={formData.stillWorking}
          onCheckedChange={(checked: boolean) => handleCheckboxChange?.('stillWorking', checked)}
        />
        <Label htmlFor="stillWorking">Currently working here</Label>
      </div>
      {!formData.stillWorking && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="endMonth">End Month</Label>
            <Input
              id="endMonth"
              name="endMonth"
              value={formData.endMonth}
              onChange={handleInputChange}
              required={!formData.stillWorking}
            />
          </div>
          <div>
            <Label htmlFor="endYear">End Year</Label>
            <Input
              id="endYear"
              name="endYear"
              value={formData.endYear}
              onChange={handleInputChange}
              required={!formData.stillWorking}
            />
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full min-h-[100px] p-2 border rounded"
          required
        />
      </div>
    </>
  );
}