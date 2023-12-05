import { Link } from "react-router-dom";
import { Input, InputType, Select } from "../../../core/core";
import {
  InstitutionType,
  ProvinceEnum,
  RegisterForm,
} from "../auth-and-profile";

export const AddMitraForm = ({
  formValue,
  institutionValues,
  handleFormChange,
  onSubmit,
  redirectLinkOnDismiss,
  dismissText,
}: {
  formValue: RegisterForm;
  institutionValues: Map<string, string>;
  handleFormChange: (e: React.ChangeEvent) => void;
  onSubmit: () => void;
  redirectLinkOnDismiss: string;
  dismissText: string;
}) => {
  const categoryKeys = Object.keys(InstitutionType);
  const categoryValues = Object.values(InstitutionType);
  const provinceKeys = Object.keys(ProvinceEnum);
  const provinceValues = Object.values(ProvinceEnum);

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
            new Map(categoryKeys.map((key, idx) => [key, categoryValues[idx]]))
          }
          value={formValue.category}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Select
          id="province"
          label="Provinsi"
          values={
            new Map(provinceKeys.map((key, idx) => [key, provinceValues[idx]]))
          }
          value={formValue.province}
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
          values={institutionValues}
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
        <Input
          type={InputType.text}
          placeholder="Kota/kabupaten"
          id="city"
          value={formValue.city}
          onChange={handleFormChange}
          required
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
          id="street"
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
          Daftar
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
