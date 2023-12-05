import { Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Input, InputType } from "../core/core";

const initialLoginForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialLoginForm);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleLogin = () => {
    // TODO: handle login
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
            placeholder="Email"
            id="email"
            value={formValue.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.password}
            placeholder="Password"
            id="password"
            value={formValue.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2 gap-1">
          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={handleLogin}
          >
            Masuk
          </button>
          <Link to="/activation">
            <button type="button" className="btn btn-secondary">
              Aktivasi
            </button>
          </Link>
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
