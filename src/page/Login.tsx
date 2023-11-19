import { Container } from "react-bootstrap";
import { Input, InputType } from "../core/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialLoginForm = {
  email: "",
  otp: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialLoginForm);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <h3>Masuk</h3>
      </div>
      <form className="">
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.email}
            placeholder="Masukkan email"
            id="email"
            value={formValue.email}
            onChange={handleFormChange}
            required
          />
          <div className="mb-3">
            <button type="button" className="btn btn-primary">
              Kirim OTP
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Masukkan OTP"
            id="otp"
            value={formValue.otp}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <button type="submit" className="btn btn-primary">
            Masuk
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Link to="/register">
            <button type="button" className="btn btn-light">
              Belum punya akun? Daftar
            </button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
