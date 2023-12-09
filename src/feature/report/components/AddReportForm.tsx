import { useEffect, useState } from "react";
import { Input, InputType, Select } from "../../../core/core";
import { IFormReportResponseData, ReportRepository } from "../report";

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
  const [categories, setCategories] = useState<IFormReportResponseData>(
    {} as IFormReportResponseData
  );

  useEffect(() => {
    ReportRepository.getInstance()
      .getProbReportCategories()
      .then((response) => {
        const newCategories = response.data;
        setCategories(newCategories);
      });
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <form className="mb-3 px-5">
      <Select
        id="problemCategory"
        label="Kategori Masalah"
        values={
          new Map(
            categories.kategoriMasalah?.map((category) => [
              category,
              category,
            ]) || []
          )
        }
        value={formValue.problemCategory}
        onChange={handleFormChange}
      />
      <Select
        id="province"
        label="Provinsi"
        values={
          new Map(
            categories.provinsi?.map((category) => [category, category]) || []
          )
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
