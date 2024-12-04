import React from "react";
import { Modal, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./styles.scss";

const ModalWrapper = ({ open, onClose, children, contentClassName, title, withoutCloseBtn, subtitle, onClick }) => {
  return (
    <Modal
      className="modal-wrapper"
      open={Boolean(open)}
      onClose={onClose}
    >
      <div className={`modal-content ${contentClassName || ""}`} onClick={onClick}>
        {(title || subtitle || !withoutCloseBtn) && (
          <div className="modal-head">
            <div className="text-box">
              <div className="modal-title">
                {title && <div className="title">{title}</div>}
                {onClose && !withoutCloseBtn && (
                  <Button onClick={onClose} className="close-modal-btn">
                    <CloseIcon />
                  </Button>
                )}
              </div>
              {subtitle && <div className="modal-subtitle">{subtitle}</div>}
            </div>
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
};

export default ModalWrapper;
