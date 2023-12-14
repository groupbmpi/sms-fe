import { Link } from "react-router-dom";
import { INewsByIdRetDto } from "../news";
import { Button } from "react-bootstrap";
import {
  ProtectedRoleComponent,
  Role,
} from "../../auth-and-profile/auth-and-profile";
import { generateDateStringIdFormat } from "../../../helper/Parser";
import { PopupModal } from "../../../core/Modal";

export const NewsCard = ({
  item,
  showDeleteConfirmation,
  setShowDeleteConfirmation,
  handleDelete,
}: {
  item: INewsByIdRetDto;
  showDeleteConfirmation: boolean;
  setShowDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: number) => void;
}) => {
  return (
    <div key={item.id}>
      <div className="card p-1 my-2">
        <div className="d-flex flex-column">
          <img
            src={item.photoLink}
            className="card-img-top"
            alt={`image-news-${item.id}`}
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "10px",
            }}
          />
          <div className="card-body d-flex flex-column justify-content-around">
            <h5 className="card-title">{item.title}</h5>
            <div className="text-body-tertiary fst-italic">
              {generateDateStringIdFormat(item.updatedAt)} - {"John Doe"}
            </div>
            <p className="card-text">{item.detail.substring(0, 100)}</p>
            <div className="d-flex flex-justify-start gap-1">
              <Link to={`/news/${item.id}`}>
                <Button variant="primary">Selengkapnya</Button>
              </Link>
              <ProtectedRoleComponent
                roleAllowed={[Role.ADMIN, Role.SUPERADMIN]}
                component={
                  <div className="d-flex gap-1">
                    <Link to={`/news/${item.id}/edit`}>
                      <Button variant="secondary">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => setShowDeleteConfirmation(true)}
                    >
                      Delete
                    </Button>
                  </div>
                }
              />
              {/* TODO Change link to based on publicationLink field */}
              <Link to={item.photoLink}>
                <Button variant="warning">Sumber</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PopupModal
        show={showDeleteConfirmation}
        title="Konfirmasi Hapus Berita"
        body="Apakah anda yakin ingin menghapus berita ini?"
        handleClose={() => setShowDeleteConfirmation(false)}
        handleAffirmative={() => {
          setShowDeleteConfirmation(false);
          handleDelete(item.id);
        }}
        handleDismiss={() => setShowDeleteConfirmation(false)}
        affirmativeText="Hapus"
      />
    </div>
  );
};
