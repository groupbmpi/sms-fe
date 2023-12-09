import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import {
  AddMitraForm,
  RegisterForm,
} from "../feature/auth-and-profile/auth-and-profile";

const UserEdit = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());

  useEffect(() => {
    // TODO fetch useer data and setFormValue with the data
  }, []);

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
    <Container className="my-2">
      <h4>Ubah User</h4>
      {/* <AddMitraForm
        formValue={formValue}
        institutionValues={institutionValues}
        handleFormChange={handleFormChange}
        onSubmit={() => {}}
        redirectLinkOnDismiss="/user"
        dismissText="Batal"
      /> */}
    </Container>
  );
};

export default UserEdit;
