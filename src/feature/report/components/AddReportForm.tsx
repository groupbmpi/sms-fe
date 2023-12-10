import { useEffect, useState } from "react";
import { Input, InputType, Select } from "../../../core/core";
import { IFormReportResponseData, IReportForm, ReportRepository } from "../report";

export const AddReportForm = ({
  formValue,
  handleFormChange,
  handleSubmit,
}: {
  formValue: IReportForm,
  handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
}) => {
  const [categories, setCategories] = useState<IFormReportResponseData>(
    {} as IFormReportResponseData
  );

  useEffect(() => {
    ReportRepository.getInstance()
      .getProbReportCategories()
      .then((categories) => {
        setCategories(categories);
      });
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <form className="mb-3 px-5">
      <Select
        id="kategoriMasalah"
        label="Kategori Masalah"
        values={
          new Map(
            categories.kategoriMasalah?.map((category) => [
              category,
              category,
            ]) || []
          )
        }
        value={formValue.kategoriMasalah}
        onChange={handleFormChange}
      />
      <Select
        id="provinsi"
        label="Provinsi"
        values={
          new Map(
            categories.provinsi?.map((category) => [category, category]) || []
          )
        }
        value={formValue.provinsi}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.textarea}
        placeholder="Masukkan deskripsi masalah"
        id="masalah"
        value={formValue.masalah}
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
