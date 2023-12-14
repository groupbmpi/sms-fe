import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import {
  AddMitraForm,
  RegisterForm,
} from "../feature/auth-and-profile/auth-and-profile";
import { UserRepository } from "../feature/user/repository/UserRepo";
import { useNavigate, useParams } from "react-router-dom";
import { IFormUserUpdate } from "../feature/user/model/User";

const UserEdit = () => {
  const { id } = useParams();
  const [formValue, setFormValue] = useState<RegisterForm>(new RegisterForm());
  const [statusVerif, setStatusVerif] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    UserRepository.getInstance()
      .getUserById(parseInt(id as string))
      .then((user) => {
        setFormValue({
          fullName: user.namaLengkap,
          email: user.email,
          phoneNumber: user.noHandphone,
          institution: user.lembaga == "" ? "Lainnya" : user.lembaga,
          institutionName: user.lembagaOthers,
          category: user.kategori,
          province: user.provinsi,
          city: user.kabupatenKota,
          subDistrict: user.kecamatan,
          village: user.kelurahan,
          streetName: user.alamat,
          postalCode: user.kodePos,
          isValid: formValue.isValid,
        });
      });
    UserRepository.getInstance()
      .getStatusUserByID(parseInt(id as string))
      .then((res) => {
        setStatusVerif(res.data.is_verified);
      });
  }, []);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({
      ...formValue,
      [id]: value,
      isValid: formValue.isValid,
    });
  };

  const handleFormSubmit = () => {
    const updateFormValue: IFormUserUpdate = {
      alamat: formValue.streetName,
      email: formValue.email,
      kategori: formValue.category,
      kabupatenKota: formValue.city,
      kecamatan: formValue.subDistrict,
      kelurahan: formValue.village,
      namaLengkap: formValue.fullName,
      kodePos: formValue.postalCode,
      lembaga: formValue.institution,
      lembagaOthers: formValue.institutionName,
      noHandphone: formValue.phoneNumber,
      provinsi: formValue.province,
    };

    UserRepository.getInstance()
      .updateUserById(parseInt(id as string), updateFormValue)
      .then(() => {
        navigate("/user");
      });
  };

  return (
    <Container className="my-2">
      <h4>Ubah User</h4>
      <AddMitraForm
        formValue={formValue}
        setFormValue={setFormValue}
        handleFormChange={handleFormChange}
        onSubmit={handleFormSubmit}
        redirectLinkOnDismiss="/user"
        dismissText="Batal"
        isEdit={true}
        isUsedOthersLembaga={!statusVerif}
      />
    </Container>
  );
};

export default UserEdit;
