import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import PopupModal from "../core/Modal";
import { RegisterForm } from "../feature/auth-and-profile/model/LoginRegister";
import { InstitutionTypeMap } from "../feature/auth-and-profile/model/InstitutionEnum";
import AddMitraForm from "../feature/auth-and-profile/components/AddMitraForm";

const Register = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
  const [showRegConfirmation, setShowRegConfirmation] = useState(false);
  const [institutionValues, setInstitutionValues] = useState<
    Map<string, string>
  >(new Map());

  useEffect(() => {
    const institutionValue = InstitutionTypeMap[formValue.category];

    if (Array.isArray(institutionValue)) {
      const newInstitution = new Map(
        institutionValue.map((value) => [value, value])
      );
      newInstitution.set("Lainnya", "Lainnya");
      setInstitutionValues(newInstitution);
    } else {
      const provinceValue = formValue.province;
      const institutionKeys = Object.keys(institutionValue);
      const institutionValues = Object.values(institutionValue);

      const idx = institutionKeys.findIndex((key) => key === provinceValue);

      let newInstitution = new Map();
      if (idx !== -1) {
        newInstitution = new Map(
          institutionValues[idx].map((value) => [value, value])
        );
      }
      newInstitution.set("Lainnya", "Lainnya");
      setInstitutionValues(newInstitution);

      if (idx === -1) {
        // set formValue.institution to "Lainnya"
        setFormValue({
          ...formValue,
          institution: "Lainnya",
          isValid: formValue.isValid,
        });
      }
    }
  }, [formValue.category, formValue.province]);

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
        institutionValues={institutionValues}
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
