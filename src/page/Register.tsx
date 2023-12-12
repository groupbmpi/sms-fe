import { Container } from "react-bootstrap";
import { useState } from "react";

import {
  AddMitraForm,
  RegisterForm,
} from "../feature/auth-and-profile/auth-and-profile";
import { PopupModal } from "../core/Modal";
import { IFormUserRegister } from "../feature/user/model/User";
import { UserRepository } from "../feature/user/repository/UserRepo";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
  const [showRegConfirmation, setShowRegConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({
      ...formValue,
      [id]: value,
      isValid: formValue.isValid,
    });
  };

  const handleSubmit = () => {
    const registerFormValue: IFormUserRegister = {
      alamat: formValue.streetName,
      email: formValue.email,
      kategori: formValue.category,
      kabupatenKota: formValue.city,
      kecamatan: formValue.subDistrict,
      kelurahan: formValue.village,
      namaLengkap: formValue.fullName,
      kodePos: formValue.postalCode,
      lembaga: formValue.institution,
      lembagaOthers: formValue.institutionName,
      noHandphone: formValue.phoneNumber,
      provinsi: formValue.province,
    };

    UserRepository.getInstance()
      .registerUser(registerFormValue)
      .then(() => {
        navigate("/activation");
      });
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <h3>Register</h3>
      </div>
      <AddMitraForm
        formValue={formValue}
        setFormValue={setFormValue}
        handleFormChange={handleFormChange}
        onSubmit={() => setShowRegConfirmation(true)}
        redirectLinkOnDismiss="/login"
        dismissText="Sudah punya akun? Masuk"
      />
      <PopupModal
        show={showRegConfirmation}
        title="Konfirmasi Pendaftaran"
        body={
          <>
            <p>Nama Lengkap: {formValue.fullName}</p>
            <p>Institusi: {formValue.institution}</p>
            <p>Kategori: {formValue.category}</p>
            <p>Nama jalan: {formValue.streetName}</p>
            <p>Provinsi: {formValue.province}</p>
            <p>Email: {formValue.email}</p>
            <p>Nomor Telepon: {formValue.phoneNumber}</p>
          </>
        }
        handleClose={() => setShowRegConfirmation(false)}
        handleAffirmative={() => {
          setShowRegConfirmation(false);
          handleSubmit();
        }}
        handleDismiss={() => setShowRegConfirmation(false)}
      />
    </Container>
  );
};

export default Register;
