import { Button, Container } from "react-bootstrap";
import { Input, InputType } from "../core/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Institution = () => {
  const navigate = useNavigate();
  const [listLembaga] = useState<any>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setSearchKeyword(value);
  };

  const handleDeleteLembaga = (id: number) => () => {
    console.log(id); // TODO delete lembaga by Id
  };

  useEffect(() => {
    // TODO fetch list lembaga
  }, []);

  useEffect(() => {
    // TODO setListLembaga based on searchKeyword
    console.log(searchKeyword);
  }, [searchKeyword]);

  return (
    <Container>
      <div className="d-flex py-2 justify-content-between">
        <h3>Lembaga</h3>
        <Button onClick={() => navigate("/institution/new")}>
          Tambah Lembaga
        </Button>
      </div>
      <div>
        <Input
          type={InputType.text}
          placeholder="Cari lembaga"
          id="search"
          value={searchKeyword}
          onChange={handleFormChange}
        />
        <div>
          <div className="d-flex gap-3 align-items-center  justify-content-between mt-2">
            <div className="fw-bold">Nama Lembaga</div>
            <div className="fw-bold">Kategori</div>
            <div className="fw-bold">Aksi</div>
          </div>
        </div>
        {listLembaga.map((lembaga: any) => {
          return (
            <div
              className="d-flex gap-3 align-items-center justify-content-between mt-2"
              key={lembaga.id}
            >
              <div>{lembaga.nama}</div>
              <div>{lembaga.kategori}</div>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/institution/${lembaga.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteLembaga(lembaga.id)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Institution;
