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
  handleSubmit: (e: React.MouseEvent) => void;
}) => {
  const [categories, setCategories] = useState<IFormReportResponseData>(
    {} as IFormReportResponseData
  );

  const [city, setCity] = useState<string[]>([]);

  useEffect(() => {
    ReportRepository.getInstance()
      .getProbReportCategories()
      .then((response) => {
        const newCategories = response;
        setCategories(newCategories);

        setCity(newCategories.daerah[0].kabupatenKota);

        setFormValue({
          ...formValue,
          kategoriMasalah: newCategories.kategoriMasalah[0],
          provinsi: newCategories.daerah[0].provinsi,
          kabupatenKota: newCategories.daerah[0].kabupatenKota[0],
        });
      });
  }, []);

  useEffect(() => {
    const newCity = categories.daerah?.filter(
      (category) => category.provinsi === formValue.provinsi
    );

    if (typeof newCity !== "undefined" && newCity.length > 0) {
      setCity(newCity[0].kabupatenKota);
    }
  }, [formValue.provinsi]);

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
            categories.daerah?.map((category) => [
              category.provinsi,
              category.provinsi,
            ]) || []
          )
        }
        value={formValue.provinsi}
        onChange={handleFormChange}
      />
      <Select
        id="kabupatenKota"
        label="Kabupaten/Kota"
        value={formValue.kabupatenKota}
        values={new Map(city?.map((city) => [city, city]) || [])}
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
