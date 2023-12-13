import { Button, Modal } from "react-bootstrap";

export const PopupModal = ({
  show,
  title,
  body,
  handleClose,
  handleAffirmative,
  handleDismiss,
  affirmativeText = "Save Changes",
}: {
  show: boolean;
  title: string;
  body: JSX.Element | string;
  handleClose: () => void;
  handleAffirmative: () => void;
  handleDismiss: () => void;
  affirmativeText?: string;
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAffirmative}>
          {affirmativeText}
        </Button>
        <Button variant="secondary" onClick={handleDismiss}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
