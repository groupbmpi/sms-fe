import { useState } from "react";
import { Button, Container } from "react-bootstrap";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const changeEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Container>
      <div className="d-flex py-2">
        <h3>Profile</h3>
        <Button
          variant={isEditMode ? `secondary` : `primary`}
          className="ms-auto"
          onClick={changeEditMode}
        >
          {isEditMode ? `Batal Ubah` : `Ubah`}
        </Button>
      </div>
      <form className="px-5">
        <div className="mb-3 px-5">
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="<Nama>"
            disabled={!isEditMode}
          />
        </div>
        <div className="mb-3 px-5">
          <input
            type="text"
            className="form-control"
            id="institution"
            aria-describedby="institution"
            placeholder="<Lembaga>"
            disabled={!isEditMode}
          />
        </div>
        <div className="mb-3 px-5">
          <input
            type="text"
            className="form-control"
            id="category"
            aria-describedby="category"
            placeholder="<Kategori>"
            disabled={!isEditMode}
          />
        </div>
        <div className="mb-3 px-5">
          <textarea
            className="form-control"
            id="address"
            rows={3}
            placeholder="<Alamat Lengkap>"
            disabled={!isEditMode}
          ></textarea>
        </div>
        <div className="mb-3 px-5">
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            placeholder="<Email>"
            disabled={!isEditMode}
          />
        </div>
        <div className="mb-3 px-5">
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            aria-describedby="phoneNumber"
            placeholder="<Nomor Telepon>"
            disabled={!isEditMode}
          />
        </div>
        <div className="mb-3 px-5">
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            id="avatar"
            aria-describedby="avatar"
            disabled={!isEditMode}
          />
        </div>
        {isEditMode ? (
          <div className="d-flex align-items-center justify-content-center">
            <Button>Simpan</Button>
          </div>
        ) : null}
      </form>
    </Container>
  );
};

export default Profile;
