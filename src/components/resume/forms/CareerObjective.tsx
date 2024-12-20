import { Label } from '@/components/ui/label';
import { CareerObjectiveInterface, FormProps } from '../../../types/index';

export function CareerObjectiveForm({ formData, handleInputChange }: FormProps<CareerObjectiveInterface>) {
    return (
        <div>
            <Label htmlFor="objective">Objective</Label>
            <textarea
                id="objective"
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                className="w-full min-h-[100px] p-2 border rounded"
                required
            />
        </div>
    );
}