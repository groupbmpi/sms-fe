import { Link } from "react-router-dom";
import { Input, InputType, Select } from "../../../core/Form";
import {
  ActivityForm,
  IFormActResponseData,
  ActivityRepository,
} from "../activity";
import { useEffect, useState } from "react";

export const AddActivityForm = ({
  formValue,
  setFormValue,
  handleFormChange,
  handleAddSuccessIndicator,
  handleDeleteSuccessIndicator,
  handleSubmit,
  onEditMode = true,
}: {
  formValue: ActivityForm;
  setFormValue: (formValue: ActivityForm) => void;
  handleFormChange: (e: React.ChangeEvent) => void;
  handleAddSuccessIndicator: () => void;
  handleDeleteSuccessIndicator: () => void;
  handleSubmit: () => void;
  onEditMode?: boolean;
}) => {
  const [categories, setCategories] = useState<IFormActResponseData>(
    {} as IFormActResponseData
  );
  const [city, setCity] = useState<string[]>([]);

  useEffect(() => {
    ActivityRepository.getInstance()
      .getActReportCategories()
      .then((response) => {
        const newCategories = response;
        setCategories(newCategories);
        setCity(newCategories.daerah[0].kabupatenKota);
        setFormValue({
          ...formValue,
          activityField: newCategories.kategoriMasalah[0],
          province: newCategories.daerah[0].provinsi,
          city: newCategories.daerah[0].kabupatenKota[0],
          activityStatus: newCategories.statusKegiatan[0],
          activityMethod: newCategories.metodePelaksanaan[0],
        });
      });
  }, []);

  useEffect(() => {
    const newCity = categories.daerah?.filter(
      (category) => category.provinsi === formValue.province
    );

    if (newCity !== undefined) {
      setCity(newCity[0].kabupatenKota);
    }
  }, [formValue.province]);

  return (
    <form className="px-5">
      <Input
        type={InputType.text}
        placeholder="Nama kegiatan"
        id="activityName"
        value={formValue.activityName}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Input
        type={InputType.textarea}
        placeholder="Tujuan kegiatan"
        id="activityGoal"
        value={formValue.activityGoal}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Select
        id="activityField"
        label="Bidang Program"
        values={
          new Map(
            categories.kategoriMasalah?.map((category) => [
              category,
              category,
            ]) || []
          )
        }
        value={formValue.activityField}
        onChange={handleFormChange}
        disabled={!onEditMode}
      />
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
        disabled={!onEditMode}
        required
      />
      <Select
        id="city"
        label="Kota"
        values={new Map(city.map((kota) => [kota, kota]) || [])}
        value={formValue.city}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Input
        type={InputType.textarea}
        placeholder="Deskripsi kegiatan"
        id="activityDescription"
        value={formValue.activityDescription}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Select
        id="activityStatus"
        label="Status Program"
        values={
          new Map(
            categories.statusKegiatan?.map((category) => [
              category,
              category,
            ]) || []
          )
        }
        value={formValue.activityStatus}
        onChange={handleFormChange}
        disabled={!onEditMode}
      />
      {Array.from(formValue.successIndicator.entries()).map(
        ([key, value], index) => (
          <div
            className="d-flex gap-3 align-items-center justify-content-center"
            key={key}
          >
            <Input
              type={InputType.text}
              placeholder={`Indikator keberhasilan ke-${index + 1}`}
              id={`successIndicator${index + 1}`}
              value={value.indicator}
              onChange={handleFormChange}
              disabled={!onEditMode}
              required
            />
            <Input
              type={InputType.number}
              placeholder={""}
              id={`outputTarget${index + 1}`}
              value={value.target.toString()}
              onChange={handleFormChange}
              disabled={!onEditMode}
              required
            />
            {index === formValue.successIndicator.length - 1 && (
              <div className="d-flex gap-2 mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddSuccessIndicator}
                  disabled={!onEditMode}
                >
                  Tambah
                </button>
                {formValue.successIndicator.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteSuccessIndicator}
                    disabled={!onEditMode}
                  >
                    Hapus
                  </button>
                )}
              </div>
            )}
          </div>
        )
      )}
      <div className="mb-3 px-5 d-flex gap-3 align-items-center justify-content-between">
        <Input
          type={InputType.datetime}
          placeholder="Tanggal mulai"
          id="startDate"
          value={formValue.startDate}
          onChange={handleFormChange}
          disabled={!onEditMode}
          required
        />
        <p>s/d</p>
        <Input
          type={InputType.datetime}
          placeholder="Tanggal selesai"
          id="endDate"
          value={formValue.endDate}
          onChange={handleFormChange}
          disabled={!onEditMode}
          required
        />
      </div>
      <Input
        type={InputType.textarea}
        placeholder="Kebutuhan logistik terpenuhi"
        id="logistics-fulfilled"
        value={formValue.logisticsFulfilled}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Input
        type={InputType.textarea}
        placeholder="Kebutuhan logistik yang dibutuhkan"
        id="logistics-needed"
        value={formValue.logisticsNeeded}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Select
        id="activityMethod"
        label="Metode Pelaksanaan"
        values={
          new Map(
            categories.metodePelaksanaan?.map((category) => [
              category,
              category,
            ]) || []
          )
        }
        value={formValue.activityMethod}
        disabled={!onEditMode}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.url}
        placeholder="Link dokumen kegiatan"
        id="activityDocument"
        value={formValue.activityDocument}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Input
        type={InputType.text}
        placeholder="Keterangan tambahan"
        id="additionalInfo"
        value={formValue.additionalInfo}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      {onEditMode && (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link to="/activity">
            <button type="button" className="btn btn-secondary">
              Batal
            </button>
          </Link>
        </div>
      )}
    </form>
  );
};
