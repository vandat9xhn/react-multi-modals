import { useLayoutEffect } from 'react';
import { getUseModal } from 'multi-modals';

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
        const {handleMounted, handleBeforeUnmount} = getUseModal({
            classAppModal,
            zIndex,

            handleClose,
            handleOpen
        });

        handleMounted();

        return () => {
            handleBeforeUnmount();
        };
    }, []);
}
