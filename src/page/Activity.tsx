import { Container } from "react-bootstrap";
import Calendar from "../feature/activity/components/Calendar";
import { Link } from "react-router-dom";

const Activity = () => {
  return (
    <>
      <Container>
        <div className="d-flex py-2">
          <h3>Timeline dan Status Kegiatan</h3>
          <Link to="/activity/new" className="ms-auto">
            <button className="btn btn-primary ms-auto">Tambah Kegiatan</button>
          </Link>
        </div>
        <Calendar />
      </Container>
    </>
  );
};

export default Activity;
