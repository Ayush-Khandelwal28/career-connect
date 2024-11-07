import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EducationInterface, FormProps } from '../../../types/index';

export function EducationForm({ formData, handleInputChange }: FormProps<EducationInterface>) {
  return (
    <>
      <div>
        <Label htmlFor="collegeName">College Name</Label>
        <Input
          id="collegeName"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="degreeName">Degree</Label>
        <Input
          id="degreeName"
          name="degreeName"
          value={formData.degreeName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="courseName">Course</Label>
        <Input
          id="courseName"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="courseStartYear">Start Year</Label>
          <Input
            id="courseStartYear"
            name="courseStartYear"
            value={formData.courseStartYear}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="courseEndYear">End Year</Label>
          <Input
            id="courseEndYear"
            name="courseEndYear"
            value={formData.courseEndYear}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="currentGPA">GPA</Label>
        <Input
          id="currentGPA"
          name="currentGPA"
          value={formData.currentGPA}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
}