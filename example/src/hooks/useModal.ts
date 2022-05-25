import { useLayoutEffect } from 'react';

import { DATA_COUNT_MODAL, modalPosArr } from '../globalVariable';

import { getLastModal } from '../utils/getLastModal';
import { makeAppStyle, removeAppStyle } from '../utils/handleAppStyle';

//
interface useModalProps {
    classAppModal: string;
    zIndex?: number;

    handleClose?: () => void;
    handleOpen?: () => void;
}

//
export function useModal({
    classAppModal,
    zIndex = 1,

    handleClose,
    handleOpen
}: useModalProps) {
    //
    useLayoutEffect(() => {
        handleOpenModal();

        return () => {
            handleCloseModal();
        };
    }, []);

    // ----

    function handleOpenModal() {
        if (modalPosArr.length === 0) {
            makeAppStyle({
                classAppModal: classAppModal,
                zIndex: zIndex
            });
        }

        const lastModal = getLastModal(classAppModal);
        const x = window.scrollX;
        const y = window.scrollY;

        lastModal.setAttribute(DATA_COUNT_MODAL, '1');
        lastModal.scrollTo(x, y);
        window.scrollTo(0, 0);
        modalPosArr.push({ x, y });

        handleOpen && handleOpen();
    }

    function handleCloseModal() {
        const lastModal = getLastModal(classAppModal);
        const { x, y } = modalPosArr.slice(-1)[0];

        handleClose && handleClose();
        
        lastModal.removeAttribute(DATA_COUNT_MODAL);
        window.scrollTo(x, y);
        modalPosArr.pop();

        if (modalPosArr.length === 0) {
            removeAppStyle();
        }

    }
}
