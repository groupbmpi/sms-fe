import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Input, Select, InputType } from "../core/core";
import { ReportEnum } from "../feature/report/report";
import { ProvinceEnum } from "../feature/auth-and-profile/auth-and-profile";
import { ActivityForm } from "../feature/activity/activity";

const ActivityPost = () => {
  const [formValue, setFormValue] = useState<ActivityForm>(new ActivityForm());

  const reportKeys = Object.keys(ReportEnum);
  const reportValues = Object.values(ReportEnum);
  const provinceKeys = Object.keys(ProvinceEnum);
  const provinceValues = Object.values(ProvinceEnum);

  const handleSubmit = () => {
    console.log(formValue);
    // TODO: handle submit
  };

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    if (id.includes("successIndicator") || id.includes("outputTarget")) {
      if (id.includes("successIndicator")) {
        const idx = parseInt(id[id.length - 1]) - 1;
        const newSuccessIndicator = formValue.successIndicator;
        newSuccessIndicator[idx].indicator = value;
      } else {
        const idx = parseInt(id[id.length - 1]) - 1;
        const newSuccessIndicator = formValue.successIndicator;
        newSuccessIndicator[idx].target = parseInt(value);
      }
      setFormValue({
        ...formValue,
        successIndicator: formValue.successIndicator,
      });
    } else {
      setFormValue({ ...formValue, [id]: value });
    }
  };

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

  return (
    <Container className="my-2">
      <h4>Tambah Kegiatan Baru</h4>
      <form className="px-5">
        <Input
          type={InputType.text}
          placeholder="Nama kegiatan"
          id="activityName"
          value={formValue.activityName}
          onChange={handleFormChange}
          required
        />
        <Input
          type={InputType.textarea}
          placeholder="Tujuan kegiatan"
          id="activityGoal"
          value={formValue.activityGoal}
          onChange={handleFormChange}
          required
        />
        <Select
          id="activityField"
          label="Bidang Program"
          values={
            new Map(reportKeys.map((key, idx) => [key, reportValues[idx]]))
          }
          value={formValue.activityField}
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
          required
        />
        <Input
          type={InputType.text}
          placeholder="Kota"
          id="city"
          value={formValue.city}
          onChange={handleFormChange}
          required
        />
        <Input
          type={InputType.textarea}
          placeholder="Deskripsi kegiatan"
          id="activityDescription"
          value={formValue.activityDescription}
          onChange={handleFormChange}
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
                required
              />
              <Input
                type={InputType.number}
                placeholder={""}
                id={`outputTarget${index + 1}`}
                value={value.target.toString()}
                onChange={handleFormChange}
                required
              />
              {index === formValue.successIndicator.length - 1 && (
                <div className="d-flex gap-2 mb-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      const newSuccessIndicator = formValue.successIndicator;
                      newSuccessIndicator.push({
                        indicator: "",
                        target: 0,
                      });
                      setFormValue({
                        ...formValue,
                        successIndicator: newSuccessIndicator,
                      });
                    }}
                  >
                    Tambah
                  </button>
                  {formValue.successIndicator.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const newSuccessIndicator = formValue.successIndicator;
                        newSuccessIndicator.pop();
                        setFormValue({
                          ...formValue,
                          successIndicator: newSuccessIndicator,
                        });
                      }}
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
            required
          />
          <p>s/d</p>
          <Input
            type={InputType.datetime}
            placeholder="Tanggal selesai"
            id="endDate"
            value={formValue.endDate}
            onChange={handleFormChange}
            required
          />
        </div>
        <Input
          type={InputType.textarea}
          placeholder="Kebutuhan logistik terpenuhi"
          id="logistics-fulfilled"
          value={formValue.logisticsFulfilled}
          onChange={handleFormChange}
          required
        />
        <Input
          type={InputType.textarea}
          placeholder="Kebutuhan logistik yang dibutuhkan"
          id="logistics-needed"
          value={formValue.logisticsNeeded}
          onChange={handleFormChange}
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
          onChange={handleFormChange}
        />
        <Input
          type={InputType.url}
          placeholder="Link dokumen kegiatan"
          id="activityDocument"
          value={formValue.activityDocument}
          onChange={handleFormChange}
          required
        />
        <Input
          type={InputType.text}
          placeholder="Keterangan tambahan"
          id="additionalInfo"
          value={formValue.additionalInfo}
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
          <Link to="/activity">
            <button type="button" className="btn btn-secondary">
              Batal
            </button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default ActivityPost;
