import { Container } from "react-bootstrap";
import { Input, InputType, Select } from "../core/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialRegisterForm = {
  fullName: "",
  institution: "",
  category: "",
  address: "",
  email: "",
  phoneNumber: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialRegisterForm);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
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
              new Map([
                ["advocation", "Advokasi"],
                ["education", "Edukasi"],
                ["empowerment", "Pemberdayaan Masyarakat"],
              ])
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
          <button className="btn btn-primary">Daftar</button>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Link to="/login">
            <button type="button" className="btn btn-light">
              Sudah punya akun? Masuk
            </button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Register;
