import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

import { generateArray } from "../helper/Iterable";
import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import {
  IAllNewsRetDto,
  IFormAllNewsResponseData,
  INewsIdArgDto,
  INewsOptionsArgDto,
} from "../feature/news/model/News";
import {
  generateDateQueryStringFormat,
  generateDateStringIdFormat,
  getAllLembagaByKategori,
  getEndDateByMonthYear,
  getNumberFromString,
  getStartDateByMonthYear,
  maxPageByRecords,
} from "../helper/Parser";
import { ResponseType } from "../feature/response";
import { NewsRepo } from "../feature/news/repository/NewsRepo";
import { Loading } from "../core/Loading";
import { PopupModal } from "../core/Modal";
import { UserRepository } from "../feature/user/user";

const ALL_LEMBAGA = "Semua Lembaga";
const ALL_KATEGORI = "Semua Kategori";

const News = () => {
  const [searchParams] = useSearchParams();

  const [news, setNews] = useState<IAllNewsRetDto>({
    news: [],
    totalRecords: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [allFilter, setAllFilter] = useState<{
    daftarLembaga: string[];
    daftarKategori: string[];
  }>({
    daftarLembaga: [],
    daftarKategori: [],
  });

  const [filter, setFilter] = useState<{
    "year-news-filter"?: number;
    "month-news-filter"?: number;
    "kategori-inst-news-filter"?: string;
    "institution-news-filter"?: string;
    "creator-id-news-filter"?: number;
  }>({
    "year-news-filter": undefined,
    "month-news-filter": undefined,
    "kategori-inst-news-filter": undefined,
    "institution-news-filter": undefined,
    "creator-id-news-filter": undefined,
  });

  const maxRecordsPerPage = 10;
  const maxPage = maxPageByRecords(news.totalRecords, maxRecordsPerPage); // TODO remove this hardcoded maxPage

  const currentPage = searchParams.get("page");
  const currentPageNum = currentPage ? parseInt(currentPage) : 1;

  const listOfPage = generateArray(
    Math.max(1, currentPageNum - 2),
    Math.min(currentPageNum + 2, maxPage)
  );

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const { id, value } = target;

    setFilter({
      ...filter,
      [id]:
        id === "year-news-filter" || id === "month-news-filter"
          ? getNumberFromString(value)
          : value,
    });
  };

  useEffect(() => {
    setIsLoading(true);

    const newsArgDto: INewsOptionsArgDto = {
      institutionId: filter["institution-news-filter"],
      creatorId: filter["creator-id-news-filter"],
      startDateAt:
        filter["month-news-filter"] !== undefined ||
        filter["year-news-filter"] !== undefined
          ? generateDateQueryStringFormat(
              getStartDateByMonthYear(
                filter["month-news-filter"],
                filter["year-news-filter"]
              )
            )
          : undefined,
      endDateAt:
        filter["month-news-filter"] !== undefined ||
        filter["year-news-filter"] !== undefined
          ? generateDateQueryStringFormat(
              getEndDateByMonthYear(
                filter["month-news-filter"],
                filter["year-news-filter"]
              )
            )
          : undefined,
      limit: maxRecordsPerPage,
      page: currentPageNum,
    };

    NewsRepo.getInstance()
      .getAllNews(newsArgDto)
      .then(function (response: ResponseType<IFormAllNewsResponseData>) {
        const data = response.data;

        const newsDto: IAllNewsRetDto = {
          news: data.news.map(function (item) {
            return {
              ...item,
              createdAt: new Date(item.createdAt),
              updatedAt: new Date(item.updatedAt),
            };
          }),
          totalRecords: data.totalRecords,
        };

        setNews(newsDto);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, [filter, searchParams]);

  useEffect(() => {
    UserRepository.getInstance()
      .getAllCategories()
      .then((res) => {
        let allLembaga: string[] = [];
        allLembaga.push(ALL_LEMBAGA);

        res.data.lembaga.forEach((item) => {
          allLembaga = [...allLembaga, ...item.lembaga];
        });

        setAllFilter({
          daftarKategori: [ALL_KATEGORI, ...res.data.kategori],
          daftarLembaga: allLembaga,
        });

        setFilter({
          ...filter,
          "kategori-inst-news-filter": ALL_KATEGORI,
          "institution-news-filter": ALL_LEMBAGA,
        });
      });
  }, []);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    console.log(filter["kategori-inst-news-filter"]);
    if (filter["kategori-inst-news-filter"] === ALL_KATEGORI) {
    } else {
      UserRepository.getInstance()
        .getAllCategories()
        .then((res) => {
          const lembagaByCategory = getAllLembagaByKategori(
            filter["kategori-inst-news-filter"]!,
            res.data.lembaga
          );

          setAllFilter({
            ...allFilter,
            daftarLembaga: [ALL_LEMBAGA, ...lembagaByCategory],
          });
        });
    }
  }, [filter["kategori-inst-news-filter"]]);

  const handleDelete = (newsId: number) => {
    setIsLoading(true);

    const newsArgDto: INewsIdArgDto = {
      id: newsId,
    };

    NewsRepo.getInstance()
      .deleteNews(newsArgDto)
      .then(function () {
        const updatedNews = news.news.filter(
          (item) => item.id !== newsArgDto.id
        );

        const updatedTotalRecords = news.totalRecords - 1;

        setNews({
          news: updatedNews,
          totalRecords: updatedTotalRecords,
        });

        alert("Berhasil menghapus berita");
      })
      .finally(function () {
        setIsLoading(false);
      });
  };

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
            <option value="">Semua Tahun</option>
            {generateArray(0, 5).map((item: number) => (
              <option value={`${new Date().getFullYear() - item}`} key={item}>
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
            <option value="">Semua Bulan</option>
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
            id="kategori-inst-news-filter"
            aria-label="kategori-inst-news-filter"
            onChange={handleFormChange}
          >
            {allFilter.daftarKategori.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            id="institution-news-filter"
            aria-label="institution-news-filter"
            onChange={handleFormChange}
          >
            {allFilter.daftarLembaga.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
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
          {news.news.map((item) => (
            <div key={item.id}>
              <div className="card p-1 my-2">
                <div className="d-flex flex-row">
                  <img
                    src={item.photoLink}
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
                      {generateDateStringIdFormat(item.updatedAt)} -{" "}
                      {"John Doe"}
                    </div>
                    <p className="card-text">{item.detail.substring(0, 100)}</p>
                    <div className="d-flex flex-justify-start gap-1">
                      <Link to={`/news/${item.id}`}>
                        <Button variant="primary">Baca Selengkapnya</Button>
                      </Link>
                      <ProtectedRoleComponent
                        roleAllowed={[Role.ADMIN, Role.SUPERADMIN]}
                        component={
                          <div className="d-flex gap-1">
                            <Link to={`/news/${item.id}/edit`}>
                              <Button variant="secondary">Edit</Button>
                            </Link>
                            <Button
                              variant="danger"
                              onClick={() => setShowDeleteConfirmation(true)}
                            >
                              Delete
                            </Button>
                          </div>
                        }
                      />
                      {/* TODO Change link to based on publicationLink field */}
                      <Link to={item.photoLink}>
                        <Button variant="warning">Lihat Sumber Berita</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <PopupModal
                show={showDeleteConfirmation}
                title="Konfirmasi Hapus Berita"
                body="Apakah anda yakin ingin menghapus berita ini?"
                handleClose={() => setShowDeleteConfirmation(false)}
                handleAffirmative={() => {
                  setShowDeleteConfirmation(false);
                  handleDelete(item.id);
                }}
                handleDismiss={() => setShowDeleteConfirmation(false)}
                affirmativeText="Hapus"
              />
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
