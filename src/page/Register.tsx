import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import {
  AddMitraForm,
  RegisterForm,
} from "../feature/auth-and-profile/auth-and-profile";
import { PopupModal } from "../core/Modal";

const Register = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
  const [showRegConfirmation, setShowRegConfirmation] = useState(false);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({
      ...formValue,
      [id]: value,
      isValid: formValue.isValid,
    });
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <h3>Register</h3>
      </div>
      <AddMitraForm
        formValue={formValue}
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
        }}
        handleDismiss={() => setShowRegConfirmation(false)}
      />
    </Container>
  );
};

export default Register;
