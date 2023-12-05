import { Link } from "react-router-dom";
import {
  ProtectedRoleComponent,
  Role,
} from "../../auth-and-profile/auth-and-profile";

export const UserTableRow = ({
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
      <td>
        <div className="d-flex gap-2">
          <Link to={`/user/${idx}/edit`}>
            <button className="btn btn-primary">Edit</button>
          </Link>
          <ProtectedRoleComponent
            roleAllowed={[Role.SUPERADMIN]}
            component={
              <button type="button" className="btn btn-danger">
                Hapus
              </button>
            }
          />
        </div>
      </td>
    </tr>
  );
};
