import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { Calendar } from "../feature/activity/activity";

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
