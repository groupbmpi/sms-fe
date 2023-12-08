import { Link } from "react-router-dom";
import { Input, InputType, Select } from "../../../core/Form";
import { ProvinceEnum } from "../../auth-and-profile/auth-and-profile";
import { ReportEnum } from "../../report/report";
import { ActivityForm } from "../activity";

export const AddActivityForm = ({
  formValue,
  handleFormChange,
  handleAddSuccessIndicator,
  handleDeleteSuccessIndicator,
  handleSubmit,
  onEditMode = true,
}: {
  formValue: ActivityForm;
  handleFormChange: (e: React.ChangeEvent) => void;
  handleAddSuccessIndicator: () => void;
  handleDeleteSuccessIndicator: () => void;
  handleSubmit: () => void;
  onEditMode?: boolean;
}) => {
  const reportKeys = Object.keys(ReportEnum);
  const reportValues = Object.values(ReportEnum);
  const provinceKeys = Object.keys(ProvinceEnum);
  const provinceValues = Object.values(ProvinceEnum);

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
        values={new Map(reportKeys.map((key, idx) => [key, reportValues[idx]]))}
        value={formValue.activityField}
        onChange={handleFormChange}
        disabled={!onEditMode}
      />
      <Select
        id="province"
        label="Provinsi"
        values={
          new Map(provinceKeys.map((key, idx) => [key, provinceValues[idx]]))
        }
        value={formValue.province}
        onChange={handleFormChange}
        disabled={!onEditMode}
        required
      />
      <Input
        type={InputType.text}
        placeholder="Kota"
        id="city"
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
          new Map([
            ["upcoming", "Belum terlaksana"],
            ["ongoing", "Sedang berjalan"],
            ["coordination", "Tahap koordinasi"],
            ["blocked", "Sedang terkendala"],
            ["done", "Sudah terlaksana"],
          ])
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
          new Map([
            ["daring", "Daring"],
            ["luring", "Luring"],
            ["hybrid", "Hybrid"],
            ["fgd", "Forum Group Discussion"],
            ["talkshow", "Talkshow"],
          ])
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
