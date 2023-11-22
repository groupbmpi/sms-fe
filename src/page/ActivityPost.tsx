import { Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Select, InputType } from "../core/Form";
import { ActivityForm } from "../feature/activity/model/Activity";
import { ReportEnum } from "../feature/report/model/ReportEnum";

const ActivityPost = () => {
  const [formValue, setFormValue] = useState<ActivityForm>(new ActivityForm());

  const reportKeys = Object.keys(ReportEnum);
  const reportValues = Object.values(ReportEnum);

  const handleSubmit = () => {
    console.log(formValue);
  };

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

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
        <Input
          type={InputType.text}
          placeholder="Lokasi"
          id="location"
          value={formValue.location}
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
        <Input
          type={InputType.textarea}
          placeholder="Indikator keberhasilan"
          id="successIndicator"
          value={formValue.successIndicator}
          onChange={handleFormChange}
          required
        />
        <Input
          type={InputType.textarea}
          placeholder="Target capaian"
          id="outputTarget"
          value={formValue.outputTarget}
          onChange={handleFormChange}
          required
        />
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
          placeholder="Kebutuhan logistik"
          id="logistics"
          value={formValue.logistics}
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
        {/* url */}
        <Input
          type={InputType.url}
          placeholder="Link dokumen kegiatan"
          id="activityDocument"
          value={formValue.activityDocument}
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
