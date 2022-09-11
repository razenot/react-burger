import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from './../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";

const modalsElement = document.querySelector("#modal");

function Modal (props) {

    return (
        props.isOpen && ReactDOM.createPortal(
            <div className={styles.root}>
                <ModalOverlay handleClose={props.handleClose} />
                <div className={styles.content}>
                    <div className={styles.header}>
                        {props.title && <p className='text text_type_main-large'>{props.title}</p>}
                        <div className={styles.close} onClick={props.handleClose}><CloseIcon type="primary" /></div>
                    </div>
                    <div className={styles.main}>
                        {props.children}
                    </div>
                </div>
            </div>,
            modalsElement
        )
    );
}

export default Modal;