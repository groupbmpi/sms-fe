import { useEffect, useState } from "react";
import { Input, InputType, Select } from "../../../core/core";
import {
  IFormReportResponseData,
  IReportForm,
  ReportRepository,
} from "../report";

export const AddReportForm = ({
  formValue,
  setFormValue,
  handleFormChange,
  handleSubmit,
}: {
  formValue: IReportForm;
  setFormValue: (formValue: IReportForm) => void;
  handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
}) => {
  const [categories, setCategories] = useState<IFormReportResponseData>(
    {} as IFormReportResponseData
  );

  useEffect(() => {
    ReportRepository.getInstance()
      .getProbReportCategories()
      .then((response) => {
        const newCategories = response;
        setCategories(newCategories);
        setFormValue({
          ...formValue,
          kategoriMasalah: newCategories.kategoriMasalah[0],
          provinsi: newCategories.provinsi[0],
        });
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
        value={formValue.kategoriMasalah}
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
