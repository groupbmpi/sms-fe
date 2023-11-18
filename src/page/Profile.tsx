import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Input, Select, InputType } from "../core/Form";

const initialProfileValue = {
  name: "John Doe",
  institution: "Majelis Ulama Indonesia",
  category: "Organisasi Masyarakat",
  address: "Jl. Raya Cibaduyut No. 1, Bandung, Jawa Barat",
  email: "johndoe@gmail.com",
  phoneNumber: "",
  avatar: "",
};

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [formValue, setFormValue] = useState(initialProfileValue);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;
    setFormValue({ ...formValue, [id]: value });
  };

  const changeEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSubmitUpdate = () => {
    // TODO handle update profile
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
      <div className="d-flex justify-content-center my-2">
        <img
          src="https://via.placeholder.com/500"
          alt="profile"
          className="rounded-circle"
          width={150}
          height={150}
        />
      </div>
      <form className="px-5">
        <div className="mb-3 px-5 pb-5">
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            id="avatar"
            aria-describedby="avatar"
            disabled={!isEditMode}
            onChange={handleFormChange}
            value={formValue.avatar}
          />
        </div>
        <Input
          type={InputType.text}
          placeholder="Nama"
          id="name"
          value={formValue.name}
          disabled={!isEditMode}
          onChange={handleFormChange}
        />
        <Input
          type={InputType.text}
          placeholder="Lembaga"
          id="institution"
          value={formValue.institution}
          disabled={!isEditMode}
          onChange={handleFormChange}
        />
        <Select
          id="category"
          label="Kategori"
          values={
            new Map([
              ["advocation", "Advokasi"],
              ["education", "Edukasi"],
              ["empowerment", "Pemberdayaan Masyarakat"],
            ])
          }
          value={formValue.category}
          onChange={handleFormChange}
          disabled={!isEditMode}
        />
        <Input
          type={InputType.textarea}
          placeholder="Alamat Lengkap"
          id="address"
          value={formValue.address}
          disabled={!isEditMode}
          onChange={handleFormChange}
        />
        <Input
          type={InputType.email}
          placeholder="Email"
          id="email"
          value={formValue.email}
          disabled={!isEditMode}
          onChange={handleFormChange}
        />
        <Input
          type={InputType.tel}
          placeholder="Nomor Telepon"
          id="phoneNumber"
          value={formValue.phoneNumber}
          disabled={!isEditMode}
          onChange={handleFormChange}
        />
        {isEditMode ? (
          <div className="d-flex align-items-center justify-content-center">
            <Button onClick={handleSubmitUpdate}>Simpan</Button>
          </div>
        ) : null}
      </form>
    </Container>
  );
};

export default Profile;
