import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { AddReportForm } from "../feature/report/components/AddReportForm";
import { ReportRepository } from "../feature/report/report";

const initialReportForm = {
  problemDescription: "",
  problemCategory: "",
  province: "",
};

const Report = () => {
  const reportRepo: ReportRepository = ReportRepository.getInstance();
  const [formValue, setFormValue] = useState(initialReportForm);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await reportRepo.getProbReportCategories();
      return data;
    };

    fetchData().then((data) => {
      console.log(data.data);
    });
  }, [reportRepo]);

  const handleSubmit = () => {
    // TODO handle submit
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
      <AddReportForm
        formValue={formValue}
        setFormValue={setFormValue}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Report;
