import { Input, InputType, Select } from "../../../core/core";
import { ProvinceEnum } from "../../auth-and-profile/auth-and-profile";
import { ReportEnum } from "../report";

export const AddReportForm = ({
  formValue,
  handleFormChange,
  handleSubmit,
}: {
  formValue: {
    problemCategory: string;
    province: string;
    problemDescription: string;
  };
  handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
}) => {
  const reportKeys = Object.keys(ReportEnum);
  const reportValues = Object.values(ReportEnum);

  const provinceKeys = Object.keys(ProvinceEnum);
  const provinceValues = Object.values(ProvinceEnum);

  return (
    <form className="mb-3 px-5">
      <Select
        id="problemCategory"
        label="Kategori Masalah"
        values={new Map(reportKeys.map((key, idx) => [key, reportValues[idx]]))}
        value={formValue.problemCategory}
        onChange={handleFormChange}
      />
      <Select
        id="province"
        label="Provinsi"
        values={
          new Map(provinceKeys.map((key, idx) => [key, provinceValues[idx]]))
        }
        value={formValue.province}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.textarea}
        placeholder="Masukkan deskripsi masalah"
        id="problemDescription"
        value={formValue.problemDescription}
        onChange={handleFormChange}
        required
      />

      <div className="d-flex align-items-center justify-content-center gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
