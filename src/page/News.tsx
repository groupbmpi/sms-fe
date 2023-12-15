import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
  INewsOptimumDatesRetDto,
  INewsOptionsArgDto,
} from "../feature/news/model/News";
import {
  generateDateQueryStringFormat,
  getAllLembagaByKategori,
  getEndDateByMonthYear,
  getNumberFromString,
  getStartDateByMonthYear,
  maxPagesByRecords,
} from "../helper/Parser";
import { ResponseType } from "../feature/response";
import { NewsRepo } from "../feature/news/repository/NewsRepo";
import { Loading } from "../core/Loading";
import { UserRepository } from "../feature/user/user";
import { NewsCard } from "../feature/news/news";
import { toast } from "react-toastify";

const News = () => {
  const [searchParams] = useSearchParams();

  const [news, setNews] = useState<IAllNewsRetDto>({
    news: [],
    totalRecords: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>(-1)

  const [allFilter, setAllFilter] = useState<{
    daftarLembaga: string[];
    daftarKategori: string[];
    yearRange: number[];
  }>({
    daftarLembaga: [],
    daftarKategori: [],
    yearRange: generateArray(1900, 2100).map((item) => item),
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
    "kategori-inst-news-filter": "",
    "institution-news-filter": "",
    "creator-id-news-filter": undefined,
  });

  const maxRecordsPerPage = 9;
  const maxPages = maxPagesByRecords(news.totalRecords, maxRecordsPerPage);

  const currentPage = searchParams.get("page");
  const currentPageNum = currentPage ? parseInt(currentPage) : 1;

  const listOfPage = generateArray(
    Math.max(1, currentPageNum - 2),
    Math.min(currentPageNum + 2, maxPages)
  );

  useEffect(() => {
    setIsLoading(true);

    const newsArgDto: INewsOptionsArgDto = {
      institutionCategory: filter["kategori-inst-news-filter"],
      institution: filter["institution-news-filter"],
      creatorId: filter["creator-id-news-filter"],
      limit: maxRecordsPerPage,
      page: currentPageNum,
      startDateAt: generateDateQueryStringFormat(
        getStartDateByMonthYear(
          filter["month-news-filter"]
            ? filter["month-news-filter"]
            : 1,
          filter["year-news-filter"]
        )
      ),
      endDateAt: generateDateQueryStringFormat(
        getEndDateByMonthYear(
          filter["month-news-filter"]
            ? filter["month-news-filter"]
            : 12,
          filter["year-news-filter"]
        )
      )
    };

    NewsRepo.getInstance()
      .getAllNews(newsArgDto)
      .then(function (response: ResponseType<IFormAllNewsResponseData>) {
        const data = response.data;

        const newsDto: IAllNewsRetDto = {
          news: data.news.map(function (item) {
            return {
              owner: {
                ...item.owner
              },
              news: {
                ...item.news,
                publicationLink: item.news.publicationLink 
                  ? item.news.publicationLink 
                  : "",
                createdAt: new Date(item.news.createdAt),
                updatedAt: new Date(item.news.updatedAt),

              },
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
    NewsRepo.getInstance()
      .getNewsOptimumDates()
      .then((response) => {
        const data = response.data;

        const newsDto: INewsOptimumDatesRetDto = {
          minDates: {
            createdAt: new Date(data.minDates.createdAt),
            updatedAt: new Date(data.minDates.updatedAt)
          },
          maxDates: {
            createdAt: new Date(data.maxDates.createdAt),
            updatedAt: new Date(data.maxDates.updatedAt)
          }
        };

        setAllFilter((prevAllFilter) => ({
          ...prevAllFilter,
          yearRange: generateArray(
            newsDto.minDates.updatedAt.getFullYear(),
            newsDto.maxDates.updatedAt.getFullYear(),
          )
        }));
      });

    UserRepository.getInstance()
      .getAllCategories()
      .then((res) => {
        let allLembaga: string[] = [];

        res.data.lembaga.forEach((item) => {
          allLembaga = [...allLembaga, ...item.lembaga];
        });

        setAllFilter((prevAllFilter) => ({
          ...prevAllFilter,
          daftarKategori: [...res.data.kategori],
          daftarLembaga: allLembaga,
        }));
      });
  }, []);

  useEffect(() => {
    if (filter["kategori-inst-news-filter"] === "") {
      return;
    } 

    UserRepository.getInstance()
      .getAllCategories()
      .then((res) => {
        const lembagaByCategory = getAllLembagaByKategori(
          filter["kategori-inst-news-filter"]!,
          res.data.lembaga
        );

        setAllFilter({
          ...allFilter,
          daftarLembaga: [...lembagaByCategory],
        });
      });
  }, [filter["kategori-inst-news-filter"]]);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const { id, value } = target;

    setFilter({
      ...filter,
      [id]: id === "year-news-filter" || id === "month-news-filter"
        ? getNumberFromString(value)
        : value,
    });
  };

  const handleDelete = (newsId: number, creatorId: number) => {
    setIsLoading(false);
  
    const newsIdArgDto: INewsIdArgDto = {
      id: newsId,
    };

    const newsOptionsArgDto: INewsOptionsArgDto = {
      creatorId,
    }

    NewsRepo.getInstance()
      .deleteNews(newsIdArgDto, newsOptionsArgDto)
      .then(function () {
        const updatedNews = news.news.filter(
          (item) => item.news.id !== newsIdArgDto.id
        );

        const updatedTotalRecords = news.totalRecords - 1;

        setNews({
          news: updatedNews,
          totalRecords: updatedTotalRecords,
        });

        toast.success("Berhasil menghapus berita");
      })
      .catch((err) => {
        toast.error(err.response.data.meta.message);
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
            {allFilter.yearRange.map((item: number) => (
              <option value={`${item}`} key={item}>
                { item }
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
            <option value="">Semua Kategori</option>
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
            <option value="">Semua Lembaga</option>
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
        <div className="container">
          <div className="row">
            {news.news.map((item) => (
              <div className="col-md-4" key={item.news.id}>
                <NewsCard
                  item={item}
                  idToDelete={idToDelete}
                  showDeleteConfirmation={showDeleteConfirmation}
                  setShowDeleteConfirmation={setShowDeleteConfirmation}
                  setIdToDelete={setIdToDelete}
                  handleDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
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
              currentPageNum === maxPages ? "disabled" : null
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
