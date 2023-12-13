import { Container } from "react-bootstrap";
import {useState } from "react";

import {
  AddMitraForm,
  RegisterForm,
} from "../feature/auth-and-profile/auth-and-profile";
import { UserRepository } from "../feature/user/repository/UserRepo";
import { IFormUserRegister } from "../feature/user/model/User";
import { useNavigate } from "react-router-dom";

const UserPostMitra = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({
      ...formValue,
      [id]: value,
      isValid: formValue.isValid,
    });

    console.log(formValue);
  };

  const handleSubmit = () => {
    const registerFormValue : IFormUserRegister = {
      alamat : formValue.streetName,
      email : formValue.email,
      kategori : formValue.category,
      kabupatenKota : formValue.city,
      kecamatan : formValue.subDistrict,
      kelurahan : formValue.village,
      namaLengkap : formValue.fullName,
      kodePos : formValue.postalCode,
      lembaga : formValue.institution,
      lembagaOthers : formValue.institutionName,
      noHandphone : formValue.phoneNumber,
      provinsi : formValue.province,
    }

    UserRepository
    .getInstance()
    .registerUserAutoAccepted(registerFormValue)
    .then(() => {
      navigate("/user");
    })
  }

  return (
    <Container className="my-2">
      <h4>Tambah Mitra</h4>
      <AddMitraForm
        formValue={formValue}
        setFormValue={setFormValue}
        handleFormChange={handleFormChange}
        onSubmit={handleSubmit}
        redirectLinkOnDismiss="/user"
        dismissText="Batal"
      />
    </Container>
  );
};

export default UserPostMitra;
