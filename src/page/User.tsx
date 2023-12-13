import { Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { UserTableRow } from "../feature/user/user";
import { UnverifiedUser } from "../feature/user/model/User";
import { UserRepository } from "../feature/user/repository/UserRepo";
import { Loading } from "../core/Loading";
import { generateArray } from "../helper/Iterable";

const initialFilterValue = {
  status: "all",
  category: "all",
};

const User = () => {
  const [filter] = useState(initialFilterValue);
  const [users, setUsers] = useState<UnverifiedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const [maxPage, setMaxPage] = useState(5);

  const currentPage = searchParams.get("page");
  const currentPageNum = currentPage ? parseInt(currentPage) : 1;

  const listOfPage = generateArray(
    Math.max(1, currentPageNum - 2),
    Math.min(currentPageNum + 2, maxPage)
  );

  useEffect(() => {
    setIsLoading(true);
    UserRepository.getInstance()
      .getAllUnverifiedUsers()
      .then((res) => {
        setUsers(res.data.user);
        // TODO setMax page
        console.log(res.data.user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // TODO fetch users with filter and do setUsers
  }, [filter]);

  useEffect(() => {
    // TODO fetch users with searchParams and do setUsers
  }, [searchParams]);

  const handleAccept = (id: number) => {
    UserRepository.getInstance()
      .verifyUser(id, true)
      .then(() => {
        UserRepository.getInstance()
          .getAllUnverifiedUsers()
          .then((res) => {
            setUsers(res.data.user);
            console.log(res.data.user);
          });
      });
  };

  const handleReject = (id: number) => {
    UserRepository.getInstance()
      .verifyUser(id, false)
      .then(() => {
        UserRepository.getInstance()
          .getAllUnverifiedUsers()
          .then((res) => {
            setUsers(res.data.user);
            console.log(res.data.user);
          });
      });
  };

  return (
    <Container className="py-2">
      <div className="d-flex py-2 justify-content-between">
        <div className="d-flex justify-content-start">
          <h3>User</h3>
          {/* TODO Remove this if no need to have filter feature */}
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {users.length === 0 ? (
            <div className="d-flex justify-content-center">
              <h5>Tidak ada permintaan verifikasi lagi</h5>
            </div>
          ) : (
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
                {users.map((user) => (
                  <UserTableRow
                    key={user.id}
                    idx={user.id}
                    name={user.namaLengkap}
                    category="Unverified"
                    handleAccept={() => handleAccept(user.id)}
                    handleReject={() => handleReject(user.id)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <nav aria-label="user-pagination">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPageNum === 1 ? "disabled" : null}`}
          >
            <Link to={`/user?page=${currentPageNum - 1}`} className="page-link">
              Previous
            </Link>
          </li>
          {listOfPage.map((item) => (
            <li
              className={`page-item ${item === currentPageNum ? "active" : ""}`}
              key={item}
            >
              <Link to={`/user?page=${item}`} className="page-link">
                {item}
              </Link>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPageNum === maxPage ? "disabled" : null
            }`}
          >
            <Link to={`/user?page=${currentPageNum + 1}`} className="page-link">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default User;
