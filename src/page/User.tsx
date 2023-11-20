import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserTableRow = ({
  idx,
  name,
  category,
  isVerified,
}: {
  idx: number;
  name: string;
  category: string;
  isVerified?: boolean;
}) => {
  const isAdmin = category === "Administrator";
  if (isAdmin) {
    isVerified = true;
  }

  return (
    <tr>
      <th scope="row">{idx}</th>
      <td>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <p className="mb-0">{name}</p>
        </div>
      </td>
      <td>
        <span
          className={`badge rounded-pill ${
            isAdmin ? "text-bg-info" : "text-bg-warning"
          }`}
        >
          {category}
        </span>
      </td>
      <td>
        <button className="btn btn-success" disabled={isVerified}>
          {isVerified || isAdmin ? "Sudah Terverifikasi" : "Verifikasi"}
        </button>
      </td>
    </tr>
  );
};

const User = () => {
  return (
    <Container className="py-2">
      <div className="d-flex py-2">
        <h3>User</h3>
        <Link to="/user/new" className="ms-auto">
          <button className="btn btn-primary ms-auto">
            Tambah Administrator
          </button>
        </Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama Lengkap</th>
            <th scope="col">Kategori</th>
            <th scope="col">Verifikasi</th>
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
