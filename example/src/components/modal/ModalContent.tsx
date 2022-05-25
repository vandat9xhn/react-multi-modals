import * as React from 'react';

import { useModal } from '../../hooks/useModal';

import Portal from '../portal/Portal';

//
export interface ModalContentProps {
    classAppModal: string;
    children: React.ReactElement;
    handleOpen?: () => void;
    handleClose?: () => void;
}

//
function ModalContent({
    children,
    handleOpen,
    handleClose,
    classAppModal
}: ModalContentProps) {
    //
    useModal({
        classAppModal: classAppModal,
        handleOpen: handleOpen,
        handleClose: handleClose
    });

    //
    return (
        <Portal>
            <div className={classAppModal}>{children}</div>
        </Portal>
    );
}

export default ModalContent;
