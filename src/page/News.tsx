import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

import { generateArray } from "../helper/Iterable";
import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { NewsRepository } from "../feature/news/news";
import { Loading } from "../core/Loading";

const News = () => {
  const [searchParams] = useSearchParams();
  // TODO make news type in NewsModel
  const [news, setNews] = useState<
    {
      id: number;
      title: string;
      detail: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState({
    "year-news-filter": "all",
    "month-news-filter": "all",
    "institution-news-filter": "all",
  });

  const maxPage = 5; // TODO remove this hardcoded maxPage

  const currentPage = searchParams.get("page");
  const currentPageNum = currentPage ? parseInt(currentPage) : 1;

  const listOfPage = generateArray(
    Math.max(1, currentPageNum - 2),
    Math.min(currentPageNum + 2, maxPage)
  );

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFilter({ ...filter, [id]: value });
  };

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const handleDelete = () => {
    // TODO delete news
  };

  useEffect(() => {
    // TODO fetch news based on currentPageNum and setNews
    setIsLoading(true);
    NewsRepository.getInstance()
      .getAllNews(currentPageNum)
      .then((res) => {
        setNews(res.news);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <Container>
      <div className="d-flex py-2 justify-content-between">
        <div className="d-flex gap-2 justify-content-start">
          <h3>Berita</h3>
          <select
            className="form-control"
            id="year-news-filter"
            aria-label="year-news-filter"
            onChange={handleFormChange}
          >
            <option value="all">Semua Tahun</option>
            {generateArray(0, 5).map((item) => (
              <option value={item} key={item}>
                {new Date().getFullYear() - item}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            id="month-news-filter"
            aria-label="month-news-filter"
            onChange={handleFormChange}
          >
            <option value="all">Semua Bulan</option>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
          <select
            className="form-control"
            id="institution-news-filter"
            aria-label="institution-news-filter"
            onChange={handleFormChange}
          >
            <option value="all">Semua Institusi</option>
            <option value="1">Pemerintah</option>
            <option value="2">Swasta</option>
            <option value="3">Pendidikan</option>
            <option value="4">Lainnya</option>
          </select>
        </div>

        <ProtectedRoleComponent
          roleAllowed={[Role.ADMIN, Role.SUPERADMIN, Role.MITRA]}
          component={
            <Link to="/news/new" className="ms-auto">
              <button className="btn btn-primary ms-auto">Tambah Berita</button>
            </Link>
          }
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {news.map((item) => (
            <div className="card p-1 my-2" key={item.id}>
              <div className="d-flex flex-row">
                <img
                  src="https://picsum.photos/200/300"
                  className="card-img-top"
                  alt={`image-news-${item.id}`}
                  style={{
                    width: "250px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-around">
                  <h5 className="card-title">{item.title}</h5>
                  <div className="text-body-tertiary fst-italic">
                    16 November 2023 - John Doe
                  </div>
                  <p className="card-text">
                    {item.detail.substring(0, 100)}...
                  </p>
                  <div className="d-flex flex-justify-start gap-1">
                    <Link to={`/news/${item.id}`}>
                      <Button variant="primary">Read More</Button>
                    </Link>
                    <ProtectedRoleComponent
                      roleAllowed={[Role.ADMIN, Role.SUPERADMIN]}
                      component={
                        <div className="d-flex gap-1">
                          <Link to={`/news/${item.id}/edit`}>
                            <Button variant="secondary">Edit</Button>
                          </Link>
                          <Button variant="danger" onClick={handleDelete}>
                            Delete
                          </Button>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <nav aria-label="news-pagination">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPageNum === 1 ? "disabled" : null}`}
          >
            <Link to={`/news?page=${currentPageNum - 1}`} className="page-link">
              Previous
            </Link>
          </li>
          {listOfPage.map((item) => (
            <li
              className={`page-item ${item === currentPageNum ? "active" : ""}`}
              key={item}
            >
              <Link to={`/news?page=${item}`} className="page-link">
                {item}
              </Link>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPageNum === maxPage ? "disabled" : null
            }`}
          >
            <Link to={`/news?page=${currentPageNum + 1}`} className="page-link">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default News;
