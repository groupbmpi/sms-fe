import { Button, Container } from "react-bootstrap";
import Calendar from "../feature/activity/components/Calendar";

const Activity = () => {
  return (
    <>
      <Container>
        <div className="d-flex py-2">
          <h3>Timeline dan Status Kegiatan</h3>
          <Button variant="primary" className="ms-auto">
            Tambah Kegiatan
          </Button>
        </div>
        <Calendar />
      </Container>
    </>
  );
};

export default Activity;
