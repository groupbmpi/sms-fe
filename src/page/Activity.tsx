import { Container } from "react-bootstrap";
import Calendar from "../feature/activity/components/Calendar";
import { Link } from "react-router-dom";
import ProtectedRoleComponent from "../feature/auth-and-profile/components/ProtectedComponent";
import { Role } from "../feature/auth-and-profile/model/AuthData";

const Activity = () => {
  return (
    <>
      <Container>
        <div className="d-flex py-2">
          <h3>Timeline dan Status Kegiatan</h3>
          <ProtectedRoleComponent
            roleAllowed={[Role.ADMIN, Role.SUPERADMIN, Role.MITRA]}
            component={
              <Link to="/activity/new" className="ms-auto">
                <button className="btn btn-primary ms-auto">
                  Tambah Kegiatan
                </button>
              </Link>
            }
          />
        </div>
        <Calendar events={[]} />
      </Container>
    </>
  );
};

export default Activity;
