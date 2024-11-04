import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormProps } from '../../../types/index';

export function ProjectForm({ formData, handleInputChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          name="projectName"
          value={formData.projectName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="projectDescription">Description</Label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleInputChange}
          className="w-full min-h-[100px] p-2 border rounded"
          required
        />
      </div>
      <div>
        <Label htmlFor="projectLink">Project Link</Label>
        <Input
          id="projectLink"
          name="projectLink"
          value={formData.projectLink}
          onChange={handleInputChange}
          type="url"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="month">Month</Label>
          <Input
            id="month"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </>
  );
}