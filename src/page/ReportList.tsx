import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const ReportList = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "John Doe",
      category: "Infrastruktur",
      province: "Jawa Barat",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, dignissimos?",
    },
    {
      id: 2,
      name: "Fulan",
      category: "Pemerintah",
      province: "Papua Pegunungan",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, dignissimos?",
    },
  ]);

  useEffect(() => {
    // TODO fetch reports and do setReports
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
              <td>{report.name}</td>
              <td>{report.category}</td>
              <td>{report.province}</td>
              <td>{report.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ReportList;
