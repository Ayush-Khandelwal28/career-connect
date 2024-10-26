import React, { ReactElement, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

interface ShadCNDIalogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogTitle: string;
  formComponent: ReactElement;
}

const ResumeModal: React.FC<ShadCNDIalogProps> = ({ isOpen, onClose, dialogTitle, formComponent }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        {React.cloneElement(formComponent, { ref: formRef, onClose })}

        <DialogFooter>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
