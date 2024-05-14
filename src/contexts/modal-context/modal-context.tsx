import { ReactNode, createContext, useContext, useState } from 'react';
import { DialogProps } from '@mui/material';
import { BaseContextProps } from 'src/global.config';
import { set } from 'date-fns';

export type TModalData = {
    open: boolean;
    title: string | ReactNode;
    content: ReactNode;
    modalProps?: Omit<DialogProps, 'open'>;
    conditionOpen?: boolean | (() => boolean);
    closeModal: () => void;
    openModal: (title: ReactNode, content: ReactNode) => void;
};

const ModalContext = createContext({ open: false } as TModalData);

export function ModalProvider({ children }: BaseContextProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<ReactNode>('');
    const [content, setContent] = useState<ReactNode>(<></>);
    const [modalProps, setModalProps] = useState(undefined);
    const [conditionOpen, setConditionOpen] = useState(true);

    const openModal = (title: ReactNode, content: ReactNode, modalProps?: any) => {
        setTitle(title);
        setContent(content);
        setModalProps(modalProps);
        setOpen(true);
    };

    const closeModal = () => {
        setTitle('');
        setConditionOpen(true);
        setOpen(false);
    };

    return <ModalContext.Provider value={{ open, title, content, modalProps, conditionOpen, closeModal, openModal }}>{children}</ModalContext.Provider>;
}

export const useModalContext = () => useContext(ModalContext);
