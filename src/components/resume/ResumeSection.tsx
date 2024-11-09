import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

interface ResumeSectionProps<T> {
  title: string;
  items: T[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  renderItem: (item: T) => ReactNode;
}

function ResumeSection<T>({
  title,
  items,
  onAdd,
  onEdit,
  onDelete,
  renderItem,
}: ResumeSectionProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Button onClick={onAdd} variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {title}
        </Button>
      </div>

      <div className="space-y-4">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="relative bg-gray-50 rounded-lg p-4">
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  onClick={() => onEdit(index)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => onDelete(index)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {renderItem(item)}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            No {title.toLowerCase()} added yet
          </p>
        )}
      </div>
    </div>
  );
}

export default ResumeSection;