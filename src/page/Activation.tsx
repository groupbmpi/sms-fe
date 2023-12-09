import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Input, InputType } from "../core/core";
import { UserRepository } from "../feature/user/user";

const initialActivationForm = {
  email: "",
  password:"",
  otp: "",
};

const AccountActivation = () => {
  const [formValue, setFormValue] = useState(initialActivationForm);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleActivation = () => {
    console.log(formValue)
    UserRepository.getInstance()
      .activateUser(formValue.email, formValue.password, formValue.otp)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <h3>Aktivasi</h3>
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
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.number}
            placeholder="OTP"
            id="otp"
            value={formValue.otp}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2 gap-1">
          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={handleActivation}
          >
            Aktivasi
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Link to="/login">
            <button type="button" className="btn btn-light">
              Sudah aktivasi? Masuk
            </button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default AccountActivation;
