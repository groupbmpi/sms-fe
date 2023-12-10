import { Container } from "react-bootstrap";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { Input, InputType } from "../core/core";
import { UserRepository } from "../feature/user/user";
import { Role, useAuth } from "../feature/auth-and-profile/auth-and-profile";
import Cookies from "universal-cookie";

const initialLoginForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialLoginForm);

  const {setUser} = useAuth();

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleLogin = () => {
    console.log(formValue);
    UserRepository.getInstance()
      .loginUser(formValue.email, formValue.password)
      .then((res) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        const cookies = new Cookies();
        cookies.set("token", res.data, { path: "/" ,expires: expirationDate});
        UserRepository.getInstance()
          .getAuthProfile()
          .then((res) => {
            console.log(res);
            setUser({
              email: res.data.email,
              token: res.data.token,
              role: res.data.role,
              access: res.data.akses,
            });
          })
      });
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
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
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
