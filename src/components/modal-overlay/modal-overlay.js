import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';


function ModalOverlay (props) {

    return (<div className={styles.overlay} onClick={props.handleClose}></div>);
}

ModalOverlay.propTypes = {
    handleClose: PropTypes.func
}; 

export default ModalOverlay;