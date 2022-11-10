import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalsElement = document.querySelector('#modal');

function Modal({ handleClose, title, children }) {
    useEffect(() => {
        document.addEventListener('keydown', eventEscKey);
        return () => {
            document.removeEventListener('keydown', eventEscKey);
        };
    }, []);

    function eventEscKey(e) {
        if (e.code === 'Escape') {
            handleClose();
        }
    }

    return ReactDOM.createPortal(
        <div className={styles.root}>
            <ModalOverlay handleClose={handleClose} />
            <div className={styles.content}>
                <div className={styles.header}>
                    {title && (
                        <p className='text text_type_main-large'>{title}</p>
                    )}
                    <div className={styles.close} onClick={handleClose}>
                        <CloseIcon type='primary' />
                    </div>
                </div>
                {children}
            </div>
        </div>,
        modalsElement
    );
}

Modal.propTypes = {
    handleClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.object,
};

export default Modal;
