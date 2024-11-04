"use client";

import { useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const openModal = (section: string, index: number | null = null) => {
    setCurrentSection(section);
    setEditIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentSection(null);
    setEditIndex(null);
  };

  return {
    isOpen,
    currentSection,
    editIndex,
    openModal,
    closeModal,
  };
}