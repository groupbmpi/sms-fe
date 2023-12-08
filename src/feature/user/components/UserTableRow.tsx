import { Link } from "react-router-dom";
import {
  ProtectedRoleComponent,
  Role,
} from "../../auth-and-profile/auth-and-profile";

export const UserTableRow = ({
  idx,
  name,
  category,
}: {
  idx: number;
  name: string;
  category: string;
}) => {
  return (
    <tr>
      <th scope="row">{idx}</th>
      <td>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <p className="mb-0">{name}</p>
        </div>
      </td>
      <td>
        <span className={`badge rounded-pill text-bg-warning`}>{category}</span>
      </td>
      <td>
        <div className="d-flex gap-2">
          <Link to={`/user/${idx}/edit`}>
            <button className="btn btn-primary">Edit</button>
          </Link>
          <button className="btn btn-success">Terima</button>
          <button className="btn btn-danger">Tolak</button>
        </div>
      </td>
    </tr>
  );
};
