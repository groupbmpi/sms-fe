import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import {
  AddMitraForm,
  RegisterForm,
} from "../feature/auth-and-profile/auth-and-profile";

const UserPostMitra = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({
      ...formValue,
      [id]: value,
      isValid: formValue.isValid,
    });
  };

  const handleSubmit = () => {};

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
