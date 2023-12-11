import { Link } from "react-router-dom";

export const UserTableRow = ({
  idx,
  name,
  category,
  handleAccept,
  handleReject
}: {
  idx: number;
  name: string;
  category: string;
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
        <span className={`badge rounded-pill text-bg-warning`}>{category}</span>
      </td>
      <td>
        <div className="d-flex gap-2">
          <Link to={`/user/${idx}/edit`}>
            <button className="btn btn-primary">Edit</button>
          </Link>
          <button className="btn btn-success" onClick={handleAccept}>Terima</button>
          <button className="btn btn-danger" onClick={handleReject}>Tolak</button>
        </div>
      </td>
    </tr>
  );
};
