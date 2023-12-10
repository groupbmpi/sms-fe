import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { ProfileForm } from "../feature/auth-and-profile/auth-and-profile";
import { UserRepository } from "../feature/user/user";

const initialProfileValue = {
  name: "John Doe",
  institution: "Majelis Ulama Indonesia",
  category: "Organisasi Masyarakat",
  province: "Jawa Barat",
  address: "Jl. Raya Cibaduyut No. 1, Bandung, Jawa Barat",
  email: "johndoe@gmail.com",
  phoneNumber: "",
  avatar: "",
};

const Profile = () => {
  const userRepo: UserRepository = UserRepository.getInstance();
  const [isEditMode, setIsEditMode] = useState(false);

  const [formValue, setFormValue] = useState(initialProfileValue);

  useEffect(() => {
    const fetchData = async () =>  {
        const data = await userRepo.getProfile();
        return data;
    };

    fetchData().then((data) => {
      setFormValue((prev) => ({
        ...prev,
        name: data.namaLengkap,
        institution: data.lembaga,
        category: data.kategori,
        province: data.provinsi,
        address: data.alamat,
        email: data.email,
        phoneNumber: data.noHandphone,
        avatar: data.linkFoto,
      }));
    });
  });

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
          src={formValue.avatar}
          alt="profile"
          className="rounded-circle"
          width={150}
          height={150}
          draggable={false}
        />
      </div>
      <ProfileForm
        formValue={formValue}
        handleFormChange={handleFormChange}
        handleSubmitUpdate={handleSubmitUpdate}
        isEditMode={isEditMode}
      />
    </Container>
  );
};

export default Profile;
