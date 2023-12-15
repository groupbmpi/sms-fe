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
  handleDelete: (newsId: number, ownerId: number) => void;
}) => {
  return (
    <div key={item.news.id}>
      <div className="card p-1 my-2">
        <div className="d-flex flex-column">
          <img
            src={item.news.photoLink}
            className="card-img-top"
            alt={`image-news-${item.news.id}`}
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "10px",
            }}
          />
          <div className="card-body d-flex flex-column justify-content-around">
            <h5 className="card-title">{item.news.title}</h5>
            <div className="text-body-tertiary fst-italic">
              {generateDateStringIdFormat(item.news.updatedAt)} - { item.owner.name }
            </div>
            <p className="card-text">{item.news.detail.substring(0, 100)}</p>
            <div className="d-flex flex-justify-start gap-1">
            <Link to={`/news/${item.news.id}`}>
                <Button variant="primary">Selengkapnya</Button>
              </Link>
              <ProtectedRoleComponent
                roleAllowed={[Role.ADMIN, Role.SUPERADMIN, Role.MITRA]}
                component={
                  <div className="d-flex gap-1">
                    {  item.news.canModify === true
                      ? <>
                          <Link to={`/news/${item.news.id}/edit`}>
                            <Button variant="secondary">Edit</Button>
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => setShowDeleteConfirmation(true)}
                          >
                            Delete
                          </Button>
                        </>
                      : <>
                        </>
                    }
                  </div>
                }
              />
              <Link target="_blank" to={ item.news.publicationLink }>
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
          handleDelete(item.news.id, item.owner.id);
        }}
        handleDismiss={() => setShowDeleteConfirmation(false)}
        affirmativeText="Hapus"
      />
    </div>
  );
};
