import { Container } from "react-bootstrap";
import { Input, InputType, Select } from "../core/Form";
import { useState } from "react";
import { Link } from "react-router-dom";
import PopupModal from "../core/Modal";
import { RegisterForm } from "../feature/auth/model/LoginRegister";
import { InstitutionType } from "../feature/auth/model/InstitutionEnum";
import { ProvinceEnum } from "../feature/auth/model/ProvinceEnum";

const Register = () => {
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
  const [showRegConfirmation, setShowRegConfirmation] = useState(false);

  const categoryKeys = Object.keys(InstitutionType);
  const categoryValues = Object.values(InstitutionType);
  const provinceKeys = Object.keys(ProvinceEnum);
  const provinceValues = Object.values(ProvinceEnum);

  console.log(formValue);

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
            placeholder="Masukkan nama lengkap"
            id="fullName"
            value={formValue.fullName}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Masukkan institusi atau lembaga"
            id="institution"
            value={formValue.institution}
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
          <Input
            type={InputType.textarea}
            placeholder="Masukkan alamat lengkap"
            id="address"
            value={formValue.address}
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
          <Input
            type={InputType.email}
            placeholder="Masukkan email"
            id="email"
            value={formValue.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.tel}
            placeholder="Masukkan nomor telepon"
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
            <p>Alamat: {formValue.address}</p>
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
