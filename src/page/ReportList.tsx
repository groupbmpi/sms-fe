import { Container } from "react-bootstrap";

const ReportList = () => {
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
          <tr>
            <th scope="row">1</th>
            <td>John Doe</td>
            <td>Infrastruktur</td>
            <td>Jawa Barat</td>
            <td>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum,
              dignissimos?
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default ReportList;
