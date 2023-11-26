import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { RegisterForm } from "../feature/auth-and-profile/model/LoginRegister";
import { InstitutionTypeMap } from "../feature/auth-and-profile/model/InstitutionEnum";
import AddMitraForm from "../feature/auth-and-profile/components/AddMitraForm";

const UserPostMitra = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
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
    <Container className="my-2">
      <h4>Tambah Mitra</h4>
      <AddMitraForm
        formValue={formValue}
        institutionValues={institutionValues}
        handleFormChange={handleFormChange}
        onSubmit={() => {}}
        redirectLinkOnDismiss="/user"
        dismissText="Batal"
      />
    </Container>
  );
};

export default UserPostMitra;
