import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IReportData, ReportRepository } from "../feature/report/report";

const ReportList = () => {
  const [reports, setReports] = useState<IReportData[]>([]);

  useEffect(() => {
    ReportRepository
      .getInstance()
      .getAllReport()
      .then((res) => {
        setReports(res.data);
      })
  }, []);

  return (
    <Container>
      <h3>Daftar Laporan</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama Pelapor</th>
            <th scope="col">Kategori</th>
            <th scope="col">Provinsi</th>
            <th scope="col">Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, idx) => (
            <tr key={report.id}>
              <th scope="row">{idx + 1}</th>
              <td>{report.namaUser}</td>
              <td>{report.kategoriMasalah}</td>
              <td>{report.provinsi}</td>
              <td>{report.masalah}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ReportList;
