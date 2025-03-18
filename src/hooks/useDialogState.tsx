import { useState, useCallback } from 'react';

interface UseDialogState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useDialogState = (initialState = false): UseDialogState => {
    const [isOpen, setIsOpen] = useState(initialState);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const onToggle = useCallback(() => setIsOpen(prev => !prev), []);

    return {
        isOpen,
        onOpen,
        onClose,
        onToggle,
        setIsOpen,
    };
};

export default useDialogState;