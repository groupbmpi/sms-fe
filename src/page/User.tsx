import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { Select } from "../core/core";
import { UserTableRow } from "../feature/user/user";
import { IUnverifiedUserResponseData,UnverifiedUser } from "../feature/user/model/User";
import { UserRepository } from "../feature/user/repository/UserRepo";

const initialFilterValue = {
  status: "all",
  category: "all",
};

const User = () => {
  const [filter, setFilter] = useState(initialFilterValue);
  const [users, setUsers] = useState<UnverifiedUser[]>([
  ]); // TODO: remove this dummy initializer after handle fetch users from API

  useEffect(() => {
    // TODO fetch users and do setUsers
    UserRepository.getInstance()
    .getAllUnverifiedUsers()
    .then((res) => {
      setUsers(res.user);
      console.log(res.user);
    });
  }, []);

  useEffect(() => {
    // TODO fetch users with filter and do setUsers
  }, [filter]);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFilter({ ...filter, [id]: value });
  };

  const handleAccept = (id: number) => {
    UserRepository.getInstance()
    .verifyUser(id,true)
    .then(() => {
      UserRepository.getInstance()
      .getAllUnverifiedUsers()
      .then((res) => {
        setUsers(res.user);
        console.log(res.user);
      });
    });
  }

  const handleReject = (id: number) => {
    UserRepository.getInstance()
    .verifyUser(id,false)
    .then(() => {
      UserRepository.getInstance()
      .getAllUnverifiedUsers()
      .then((res) => {
        setUsers(res.user);
        console.log(res.user);
      });
    });
  }

  return (
    <Container className="py-2">
      <div className="d-flex py-2 justify-content-between">
        <div className="d-flex justify-content-start">
          <h3>User</h3>
          {/* <Select
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
          /> */}
          {/* <Select
            id="category"
            label="Semua Kategori"
            values={
              new Map(
                categoryKeys.map((key, idx) => [
                  key,
                  categoryValuesWithAll[idx],
                ])
              )
            }
            value={filter.category}
            onChange={handleFormChange}
          /> */}
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
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <UserTableRow
              key={user.id}
              idx={idx + 1}
              name={user.namaLengkap}
              category="Unverified"
              handleAccept={() => handleAccept(user.id)}
              handleReject={() => handleReject(user.id)}
            />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default User;
