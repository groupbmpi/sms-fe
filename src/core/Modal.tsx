import { Button, Modal } from "react-bootstrap";

export const PopupModal = ({
  show,
  title,
  body,
  handleClose,
  handleAffirmative,
  handleDismiss,
}: {
  show: boolean;
  title: string;
  body: JSX.Element | string;
  handleClose: () => void;
  handleAffirmative: () => void;
  handleDismiss: () => void;
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAffirmative}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleDismiss}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
