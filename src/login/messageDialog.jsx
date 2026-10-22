import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function MessageDialog(props) {
  return (
    <Modal show={Boolean(props.message)} onHide={props.onHide} centered>
      <Modal.Body className="bg-dark text-light border border-secondary rounded">
        {props.message}
      </Modal.Body>
      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}