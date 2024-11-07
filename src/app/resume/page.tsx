"use client";

import { useEffect, useState } from 'react';
import { ResumeSectionList } from '@/components/resume/ResumeSectionList';
import ResumeModal from '@/components/resume/ResumeModal';
import { useResume } from '@/hooks/useResume';
import { useModal } from '@/hooks/useModal';
import { ResumeData } from '@/types';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';

const Page = () => {
  const { resumeData, setResumeData, updateItem, deleteItem } = useResume();
  const { isOpen, currentSection, editIndex, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type SectionData = ResumeData[keyof ResumeData];

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/api/resume', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        const data = await response.json();
        console.log('Resume data fetched successfully:', data);
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchResumeData();
  }, []);

  const handleAdd = (section: keyof ResumeData) => {
    openModal(section);
  };

  const handleEdit = (section: keyof ResumeData, index: number) => {
    openModal(section, index);
  };

  const handleDelete = (section: keyof ResumeData, index: number) => {
    deleteItem(section, index);
  };

  const handleSave = (data: SectionData) => {
    if (currentSection) {
      updateItem(currentSection as keyof ResumeData, data, editIndex);
      closeModal();
    }
  };

  const handleSubmit = async () => {
    console.log("Resume submitted");
    console.log(resumeData);

    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error('Failed to send resume data');
      }

      const result = await response.json();
      console.log('Resume data sent successfully:', result);
    } catch (error) {
      console.error('Error sending resume data:', error);
    }
  };

  if (loading) return <div><Loading /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        </div>

        <ResumeSectionList
          resumeData={resumeData}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isOpen && currentSection && (
          <ResumeModal
            section={currentSection as keyof ResumeData}
            initialData={editIndex !== null ? (resumeData[currentSection as keyof ResumeData][editIndex] as unknown as SectionData) : undefined}
            onSave={handleSave}
            onClose={closeModal}
          />
        )}

        <div className="flex justify-center mt-6">
          <Button onClick={handleSubmit} className="bg-blue-500 text-white w-1/2 sm:w-1/3 md:w-1/4">
            Submit Resume
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
