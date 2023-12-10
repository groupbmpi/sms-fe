import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { ProfileForm } from "../feature/auth-and-profile/auth-and-profile";
import { UserRepository } from "../feature/user/user";
import { IUserData } from "../feature/user/model/User";

const initialProfileValue = {
  name: "John Doe",
  institution: "Majelis Ulama Indonesia",
  category: "Organisasi Masyarakat",
  province: "Jawa Barat",
  address: "Jl. Raya Cibaduyut No. 1, Bandung, Jawa Barat",
  email: "johndoe@gmail.com",
  phoneNumber: "",
  avatar: "",
  linkFoto: ""
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
        linkFoto: data.linkFoto,
      }));
    });
  }, [userRepo]);

  function getBase64(file: File, value: string) : Promise<{value: string, base64: string}> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({
        value: value,
        base64: reader.result as string
      });
      reader.onerror = error => reject(error);
    });
  }

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    if(id === "avatar") {
      getBase64(target.files![0], target.value).then((data) => {
        setFormValue({ ...formValue, avatar: data.value, linkFoto: data.base64});
      });
      return;
    } 
    const value = target.value;
    setFormValue({ ...formValue, [id]: value });
  };

  const changeEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSubmitUpdate = async () => {
    const newProfile: IUserData = await userRepo.updateProfile({
      namaLengkap: formValue.name,
      noHandphone: formValue.phoneNumber,
      avatar: formValue.avatar ? formValue.linkFoto : "",
    });
    setFormValue((prev) => ({
      ...prev,
      name: newProfile.namaLengkap,
      phoneNumber: newProfile.noHandphone,
      linkFoto: newProfile.linkFoto
    }));
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
          src={formValue.linkFoto}
          alt="profile"
          className="rounded-circle object-fit-cover"
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
