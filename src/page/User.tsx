import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  InstitutionType,
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { Select } from "../core/Form";
import { UserTableRow } from "../feature/user/user";

const initialFilterValue = {
  status: "all",
  category: "all",
};

const User = () => {
  const [filter, setFilter] = useState(initialFilterValue);

  const categoryKeys = Object.keys(InstitutionType);
  const categoryValues = Object.values(InstitutionType);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFilter({ ...filter, [id]: value });
  };

  return (
    <Container className="py-2">
      <div className="d-flex py-2 justify-content-between">
        <div className="d-flex justify-content-start">
          <h3>User</h3>
          <Select
            id="status"
            label="Status"
            values={
              new Map([
                ["all", "Semua status"],
                ["verified", "Terverifikasi"],
                ["unverified", "Belum Terverifikasi"],
              ])
            }
            value={filter.status}
            onChange={handleFormChange}
          />
          <Select
            id="category"
            label="Semua Kategori"
            values={
              new Map(
                categoryKeys.map((key, idx) => [key, categoryValues[idx]])
              )
            }
            value={filter.category}
            onChange={handleFormChange}
          />
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex gap-2">
            <ProtectedRoleComponent
              roleAllowed={[Role.SUPERADMIN]}
              component={
                <Link to="/user/new-admin">
                  <button className="btn btn-primary ms-auto">
                    Tambah Administrator
                  </button>
                </Link>
              }
            />
            <Link to="/user/new-mitra">
              <button className="btn btn-secondary ms-auto">
                Tambah Mitra
              </button>
            </Link>
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama Lengkap</th>
            <th scope="col">Kategori</th>
            <th scope="col">Verifikasi</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <UserTableRow idx={1} name="John Doe" category="Administrator" />
          <UserTableRow idx={2} name="Fulan" category="Pemerintah" isVerified />
          <UserTableRow idx={3} name="Fulan" category="Pemerintah" />
        </tbody>
      </table>
    </Container>
  );
};

export default User;
