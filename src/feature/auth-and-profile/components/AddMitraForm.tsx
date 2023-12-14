import { Link } from "react-router-dom";
import { Input, InputType, Select } from "../../../core/core";
import { RegisterForm } from "../auth-and-profile";
import { useEffect, useState } from "react";
import { UserRepository } from "../../user/user";
import { ICategoriesResponseData } from "../../user/model/User";

export const AddMitraForm = ({
  formValue,
  setFormValue,
  handleFormChange,
  onSubmit,
  redirectLinkOnDismiss,
  dismissText,
  isEdit,
  isUsedOthersLembaga,
}: {
  formValue: RegisterForm;
  setFormValue: React.Dispatch<React.SetStateAction<RegisterForm>>;
  handleFormChange: (e: React.ChangeEvent) => void;
  onSubmit: () => void;
  redirectLinkOnDismiss: string;
  dismissText: string;
  isEdit?: boolean;
  isUsedOthersLembaga?: boolean;
}) => {
  const [categories, setCategories] = useState<ICategoriesResponseData>(
    {} as ICategoriesResponseData
  );
  const [city, setCity] = useState<string[]>([]);
  const [lembaga, setLembaga] = useState<string[]>([]);

  useEffect(() => {
    UserRepository.getInstance()
      .getAllCategories()
      .then((response) => {
        const newCategories = response.data;

        console.log(newCategories);
        setCategories(newCategories);
        setCity(newCategories.daerah[0].kabupatenKota);
        if (isUsedOthersLembaga) {
          setLembaga([...newCategories.lembaga[0].lembaga, "Lainnya"]);
        } else {
          setLembaga(newCategories.lembaga[0].lembaga);
        }

        // check if form is edit
        if (!isEdit) {
          setFormValue((prev: RegisterForm) => ({
            ...prev,
            institution: newCategories.lembaga[0].lembaga[0],
            category: newCategories.kategori[0],
            province: newCategories.daerah[0].provinsi,
            city: newCategories.daerah[0].kabupatenKota[0],
            isValid: prev.isValid,
          }));
        }
      });
  }, [isEdit, setFormValue]);

  useEffect(() => {
    const newCity = categories.daerah?.filter(
      (category) => category.provinsi === formValue.province
    );

    if (newCity !== undefined) {
      setCity(newCity[0].kabupatenKota);
    }
  }, [formValue.province, categories.daerah]);

  useEffect(() => {
    const newLembaga = categories.lembaga?.filter(
      (lembaga) => lembaga.kategori === formValue.category
    );

    if (typeof newLembaga !== "undefined") {
      if (isUsedOthersLembaga) {
        setLembaga([...newLembaga[0].lembaga, "Lainnya"]);
      } else {
        setLembaga(newLembaga[0].lembaga);
      }
    }
  }, [categories.lembaga, formValue.category]);

  return (
    <form className="">
      <div className="d-flex justify-content-center align-items-center">
        <Input
          type={InputType.text}
          placeholder="Nama lengkap"
          id="fullName"
          value={formValue.fullName}
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
              categories.kategori?.map((category) => [category, category])
            )
          }
          value={formValue.category}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Select
          id="institution"
          label="Institusi"
          onChange={handleFormChange}
          value={formValue.institution}
          values={new Map(lembaga?.map((lembaga) => [lembaga, lembaga]) || [])}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Select
          id="province"
          label="Provinsi"
          values={
            new Map(
              categories.daerah?.map((category) => [
                category.provinsi,
                category.provinsi,
              ]) || []
            )
          }
          value={formValue.province}
          onChange={handleFormChange}
          required
        />
      </div>
      {formValue.institution === "Lainnya" && (
        <div className="d-flex justify-content-center align-items-center">
          <Input
            type={InputType.text}
            placeholder="Nama institusi"
            id="institutionName"
            value={formValue.institutionName}
            onChange={handleFormChange}
            required
          />
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <Select
          id="city"
          label="Kota"
          onChange={handleFormChange}
          value={formValue.city}
          values={new Map(city.map((kota) => [kota, kota]) || [])}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Input
          type={InputType.text}
          placeholder="Kecamatan"
          id="subDistrict"
          value={formValue.subDistrict}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Input
          type={InputType.text}
          placeholder="Kelurahan/desa"
          id="village"
          value={formValue.village}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Input
          type={InputType.textarea}
          placeholder="Nama jalan"
          id="streetName"
          value={formValue.streetName}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Input
          type={InputType.text}
          placeholder="Kode pos"
          id="postalCode"
          value={formValue.postalCode}
          onChange={handleFormChange}
          required
        />
      </div>
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
          type={InputType.tel}
          placeholder="Nomor telepon"
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
          disabled={!formValue.isValid()}
          onClick={onSubmit}
        >
          Simpan
        </button>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <Link to={redirectLinkOnDismiss}>
          <button type="button" className="btn btn-light">
            {dismissText}
          </button>
        </Link>
      </div>
    </form>
  );
};
