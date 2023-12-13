import { Link } from "react-router-dom";

export const UserTableRow = ({
  id,
  idx,
  name,
  statusVerify,
  handleAccept,
  handleReject
}: {
  id : number;
  idx: number;
  name: string;
  statusVerify: boolean;
  handleAccept : () => void,
  handleReject : () => void
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
        <div className="d-flex gap-2">
          <Link to={`/user/${id}/edit`}>
            <button className="btn btn-primary">Edit</button>
          </Link>
          <button disabled={statusVerify} className="btn btn-success" onClick={handleAccept}>Terima</button>
          <button disabled={statusVerify} className="btn btn-danger" onClick={handleReject}>Tolak</button>
        </div>
      </td>
    </tr>
  );
};
