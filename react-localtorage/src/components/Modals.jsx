import React from "react";
import { Modal } from "react-bootstrap";

const Modals = ({Component, show, onHide, heading}) => {
  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Component}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Modals;
