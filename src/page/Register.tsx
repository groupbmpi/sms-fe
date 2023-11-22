import { Container } from "react-bootstrap";
import { Input, InputType, Select } from "../core/Form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopupModal from "../core/Modal";
import { RegisterForm } from "../feature/auth/model/LoginRegister";
import {
  InstitutionType,
  InstitutionTypeMap,
} from "../feature/auth/model/InstitutionEnum";
import { ProvinceEnum } from "../feature/auth/model/ProvinceEnum";

const Register = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
  const [showRegConfirmation, setShowRegConfirmation] = useState(false);
  const [institutionValues, setInstitutionValues] = useState<
    Map<string, string>
  >(new Map());

  const categoryKeys = Object.keys(InstitutionType);
  const categoryValues = Object.values(InstitutionType);
  const provinceKeys = Object.keys(ProvinceEnum);
  const provinceValues = Object.values(ProvinceEnum);

  useEffect(() => {
    const institutionValue = InstitutionTypeMap[formValue.category];

    // if values type array
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
      <form className="">
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Nama lengkap"
            id="fullName"
            value={formValue.fullName}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Select
            id="category"
            label="Kategori"
            values={
              new Map(
                categoryKeys.map((key, idx) => [key, categoryValues[idx]])
              )
            }
            value={formValue.category}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Select
            id="province"
            label="Provinsi"
            values={
              new Map(
                provinceKeys.map((key, idx) => [key, provinceValues[idx]])
              )
            }
            value={formValue.province}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Select
            id="institution"
            label="Institusi"
            onChange={handleFormChange}
            value={formValue.institution}
            values={institutionValues}
          />
        </div>
        {formValue.institution === "Lainnya" && (
          <div className="d-flex justify-content-center align-items-center">
            <Input
              type={InputType.text}
              placeholder="Nama institusi"
              id="institutionName"
              value={formValue.institutionName}
              onChange={handleFormChange}
              disabled={formValue.institution !== "Lainnya"}
              required
            />
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Kota/kabupaten"
            id="city"
            value={formValue.city}
            onChange={handleFormChange}
            disabled={formValue.institution !== "Lainnya"}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Kecamatan"
            id="subDistrict"
            value={formValue.subDistrict}
            onChange={handleFormChange}
            disabled={formValue.institution !== "Lainnya"}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Kelurahan/desa"
            id="village"
            value={formValue.village}
            onChange={handleFormChange}
            disabled={formValue.institution !== "Lainnya"}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.textarea}
            placeholder="Nama jalan"
            id="street"
            value={formValue.streetName}
            onChange={handleFormChange}
            disabled={formValue.institution !== "Lainnya"}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Kode pos"
            id="postalCode"
            value={formValue.postalCode}
            onChange={handleFormChange}
            disabled={formValue.institution !== "Lainnya"}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.email}
            placeholder="Email"
            id="email"
            value={formValue.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.tel}
            placeholder="Nomor telepon"
            id="phoneNumber"
            value={formValue.phoneNumber}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (formValue.isValid()) {
                setShowRegConfirmation(true);
              }
            }}
            disabled={!formValue.isValid()}
          >
            Daftar
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Link to="/login">
            <button type="button" className="btn btn-light">
              Sudah punya akun? Masuk
            </button>
          </Link>
        </div>
      </form>
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