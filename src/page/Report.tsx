import { Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ReportEnum } from "../feature/report/report";
import {
  ProtectedRoleComponent,
  ProvinceEnum,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { Input, InputType, Select } from "../core/core";

const initialReportForm = {
  problemDescription: "",
  problemCategory: "",
  province: "",
};

const Report = () => {
  const [formValue, setFormValue] = useState(initialReportForm);

  const reportKeys = Object.keys(ReportEnum);
  const reportValues = Object.values(ReportEnum);

  const provinceKeys = Object.keys(ProvinceEnum);
  const provinceValues = Object.values(ProvinceEnum);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  return (
    <Container>
      <div className="d-flex py-2 justify-content-between">
        <h3>Laporkan Masalah</h3>

        <ProtectedRoleComponent
          roleAllowed={[Role.ADMIN, Role.SUPERADMIN]}
          component={
            <Link to="/problem-report/list" className="ms-auto">
              <button className="btn btn-primary ms-auto">
                Lihat Daftar Laporan
              </button>
            </Link>
          }
        />
      </div>
      <div className="mb-3 px-5">
        <Select
          id="problemCategory"
          label="Kategori Masalah"
          values={
            new Map(reportKeys.map((key, idx) => [key, reportValues[idx]]))
          }
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Report;
