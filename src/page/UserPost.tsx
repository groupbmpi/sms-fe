import { Container } from "react-bootstrap";
import { Input, InputType } from "../core/Form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isDomainBCF } from "../helper/Parser";

const UserPost = () => {
  const [formValue, setFormValue] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setFormValue(value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO add post request
    if (isDomainBCF(formValue)) {
      // TODO add post request
    } else {
      // TODO add notif that email is not BCF domain
    }
  };

  return (
    <Container className="my-2">
      <h4>Tambah Administrator</h4>
      <form className="px-5">
        <Input
          type={InputType.email}
          placeholder="Masukkan email administrator BCF"
          id="adminEmail"
          onChange={handleEmailChange}
          value={formValue}
          required
        />
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
          <Link to="/user">
            <button type="button" className="btn btn-secondary">
              Batal
            </button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default UserPost;
