import { Button, Container } from "react-bootstrap";
import { Input, InputType } from "../core/core";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateArray } from "../helper/Iterable";
import PaginationNavigation from "../layout/Pagination";
import { LembagaRepository } from "../feature/lembaga/lembaga";
import { ILembagaDTO } from "../feature/lembaga/model/lembaga";
import { toast } from "react-toastify";

const LIMIT_PER_PAGE = 10;

const Institution = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const currentPageNum = currentPage ? parseInt(currentPage) : 1;
  const [maxPage, setMaxPage] = useState<number>(5);

  const listOfPage = generateArray(
    Math.max(1, currentPageNum - 2),
    Math.min(currentPageNum + 2, maxPage)
  );

  const [listLembaga, setListLembaga] = useState<ILembagaDTO[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setSearchKeyword(value);
  };

  useEffect(() => {
    // TODO fetch list lembaga
    LembagaRepository.getInstance()
      .getAllLembaga({
        page: currentPageNum,
        limit: LIMIT_PER_PAGE,
      })
      .then((res) => {
        setListLembaga(res.data);
        setMaxPage(res.countPages == 0 ? 1 : res.countPages);
      });
  }, [currentPageNum]);

  useEffect(() => {
    // TODO setListLembaga based on searchKeyword
    LembagaRepository.getInstance()
      .getAllLembaga({
        page: currentPageNum,
        limit: LIMIT_PER_PAGE,
        nama: searchKeyword,
      })
      .then((res) => {
        setListLembaga(res.data);
        setMaxPage(res.countPages == 0 ? 1 : res.countPages);
      });
  }, [searchKeyword]);

  return (
    <Container>
      <div className="d-flex py-2 justify-content-between mb-2">
        <h3>Lembaga</h3>
        <Button onClick={() => navigate("/institution/new")}>
          Tambah Lembaga
        </Button>
      </div>
      <Input
        type={InputType.text}
        placeholder="Cari lembaga"
        id="search"
        value={searchKeyword}
        onChange={handleFormChange}
        withLabel={false}
      />

      {listLembaga.length === 0 ? (
        <h5 className="text-center p-5">
          Tidak ada lembaga dengan pencarian tersebut
        </h5>
      ) : (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Lembaga</th>
                <th scope="col">Kategori</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listLembaga.map((lembaga, index) => (
                <tr key={lembaga.id}>
                  <td>{(currentPageNum - 1) * LIMIT_PER_PAGE + index + 1}</td>
                  <td>{lembaga.nama}</td>
                  <td>{lembaga.kategori}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        navigate(`/institution/${lembaga.id}/edit`)
                      }
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <PaginationNavigation
        currentPageNum={currentPageNum}
        maxPage={maxPage}
        listOfPage={listOfPage}
        path="institution"
      />
    </Container>
  );
};

export default Institution;
