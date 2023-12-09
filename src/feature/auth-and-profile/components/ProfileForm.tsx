import { Button } from "react-bootstrap";
import { Input, InputType } from "../../../core/Form";

export const ProfileForm = ({
  formValue,
  handleFormChange,
  handleSubmitUpdate,
  isEditMode,
}: {
  formValue: any;
  handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmitUpdate: () => void;
  isEditMode: boolean;
}) => {
  return (
    <form className="px-5">
      <div className="mb-3 px-5 pb-5">
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="form-control"
          id="avatar"
          aria-describedby="avatar"
          disabled={!isEditMode}
          onChange={handleFormChange}
          value={formValue.avatar}
        />
      </div>
      <Input
        type={InputType.text}
        placeholder="Nama"
        id="name"
        value={formValue.name}
        disabled={!isEditMode}
        onChange={handleFormChange}
        required
      />
      <Input
        type={InputType.text}
        placeholder="Lembaga"
        id="institution"
        value={formValue.institution}
        disabled
        onChange={handleFormChange}
        required
      />
      {/* <Select
      id="category"
      label="Kategori"
      values={
        new Map(categoryKeys.map((key, idx) => [key, categoryValues[idx]]))
      }
      value={formValue.category}
      onChange={handleFormChange}
      disabled
    />
    <Select
      id="province"
      label="Provinsi"
      values={
        new Map(provinceKeys.map((key, idx) => [key, provinceValues[idx]]))
      }
      value={formValue.province}
      onChange={handleFormChange}
      disabled={!isEditMode}
    /> */}
      <Input
        type={InputType.textarea}
        placeholder="Alamat Lengkap"
        id="address"
        value={formValue.address}
        disabled={!isEditMode}
        onChange={handleFormChange}
        required
      />
      <Input
        type={InputType.email}
        placeholder="Email"
        id="email"
        value={formValue.email}
        disabled
        onChange={handleFormChange}
        required
      />
      <Input
        type={InputType.tel}
        placeholder="Nomor Telepon"
        id="phoneNumber"
        value={formValue.phoneNumber}
        disabled={!isEditMode}
        onChange={handleFormChange}
        required
      />
      {isEditMode ? (
        <div className="d-flex align-items-center justify-content-center">
          <Button type="submit" onClick={handleSubmitUpdate}>
            Simpan
          </Button>
        </div>
      ) : null}
    </form>
  );
};
