import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input, InputType } from "../core/core";
import { isDomainBCF } from "../helper/Parser";
import { UserRepository } from "../feature/user/user";
import { IFormRegisterAdmin } from "../feature/user/model/User";
import { toast } from "react-toastify";

const UserPostAdmin = () => {
  const [formValue, setFormValue] = useState<string>("");
  const [isDomain, setIsDomain] = useState<boolean>(false);

  const navigate = useNavigate();

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
    const newAdmin: IFormRegisterAdmin = {
      email: formValue,
    };
    if (isDomainBCF(formValue)) {
      UserRepository.getInstance()
        .registerAdmin(newAdmin)
        .then(() => {
          setFormValue("");
          toast.success("Admin berhasil ditambahkan");
          navigate("/user");
        })
        .catch((err) => {
          toast.error(err.response.data.meta.message)
        });
    } else {
      toast.error("Email harus berdomain BCF (@bcf.or.id)");
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
