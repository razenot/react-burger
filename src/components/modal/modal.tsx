import { FC, ReactNode, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { TModal } from '../../services/utils/types';
import styles from './modal.module.css';

const modalsElement = document.querySelector('#modal');

const Modal: FC<TModal> = ({ handleClose, title, children }) => {
    useEffect(() => {
        document.addEventListener('keydown', eventEscKey);
        return () => {
            document.removeEventListener('keydown', eventEscKey);
        };
    }, []);

    const eventEscKey = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            handleClose();
        }
    };

    return (
        modalsElement &&
        ReactDOM.createPortal(
            <div className={styles.root}>
                <ModalOverlay handleClose={handleClose} />
                <div className={styles.content}>
                    <div className={styles.header}>
                        {title && <p className='text text_type_main-large'>{title}</p>}
                        <div className={styles.close} onClick={handleClose}>
                            <CloseIcon type='primary' />
                        </div>
                    </div>
                    {children}
                </div>
            </div>,
            modalsElement
        )
    );
};

export default Modal;
