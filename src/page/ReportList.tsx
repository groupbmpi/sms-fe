import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IReportData, ReportRepository } from "../feature/report/report";
import { Link, useSearchParams } from "react-router-dom";
import { generateArray } from "../helper/Iterable";
import { Loading } from "../core/Loading";

const ReportList = () => {
  const [searchParams] = useSearchParams();
  const [reports, setReports] = useState<IReportData[]>([]);
  const [maxPage, setMaxPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    ReportRepository.getInstance()
      .getAllReport("", parseInt(searchParams.get("page") || "1"))
      .then((res) => {
        setReports(res.data);
        setMaxPage(res.countPages);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  const currentPage = searchParams.get("page");
  const currentPageNum = currentPage ? parseInt(currentPage) : 1;

  const listOfPage = generateArray(
    Math.max(1, currentPageNum - 2),
    Math.min(currentPageNum + 2, maxPage)
  );

  return (
    <Container>
      <h3>Daftar Laporan</h3>
      {!isLoading ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Pelapor</th>
              <th scope="col">Kategori</th>
              <th scope="col">Provinsi</th>
              <th scope="col">Kabupaten/Kota</th>
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
                <td>{report.kabupatenKota}</td>
                <td>{report.masalah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}

      <nav aria-label="reportlist-pagination">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPageNum === 1 ? "disabled" : null}`}
          >
            <Link
              to={`/problem-report/list?page=${currentPageNum - 1}`}
              className="page-link"
            >
              Previous
            </Link>
          </li>
          {listOfPage.map((item) => (
            <li
              className={`page-item ${item === currentPageNum ? "active" : ""}`}
              key={item}
            >
              <Link
                to={`/problem-report/list?page=${item}`}
                className="page-link"
              >
                {item}
              </Link>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPageNum === maxPage ? "disabled" : null
            }`}
          >
            <Link
              to={`/problem-report/list?page=${currentPageNum + 1}`}
              className="page-link"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default ReportList;
