import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Input, InputType } from "../core/core";
import { isDomainBCF } from "../helper/Parser";
import { UserRepository } from "../feature/user/user";
import { IFormRegisterAdmin } from "../feature/user/model/User";

const UserPostAdmin = () => {
  const [formValue, setFormValue] = useState<string>("");
  const [isDomain, setIsDomain] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setFormValue(value);
  };

  useEffect(() => {
    if (isDomainBCF(formValue)) {
      setIsDomain(true);
    } else {
      setIsDomain(false);
    }
  }, [formValue]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAdmin : IFormRegisterAdmin = {
      email : formValue,
    }
    if (isDomainBCF(formValue)) {
      console.log(newAdmin);
      UserRepository.getInstance()
        .registerAdmin(newAdmin)
        .then(() => {
          // TODO add notif that admin has been added
          setFormValue("");
        });
    } else {
      // TODO add notif that email is not BCF domain
      console.log("not bcf domain");
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
        {!isDomain && (
          <p className="px-5 mx-2 text-danger">
            Alamat email harus berdomain BCF (@bcf.or.id)
          </p>
        )}
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleFormSubmit}
            disabled={!isDomain}
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

export default UserPostAdmin;
