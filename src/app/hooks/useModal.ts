import { useState } from "react";

export default function useModal(initialValue: React.ReactNode | null = null) {
    const [modal, setModal] = useState<React.ReactNode | null>(initialValue);


    const openModal = (content: React.ReactNode) => {
        setModal(content);
    }

    const closeModal = () => {
        setModal(undefined);
    }


    return { modal, openModal, closeModal };

}