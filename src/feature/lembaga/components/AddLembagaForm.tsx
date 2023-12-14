import { Button } from "react-bootstrap";
import { Input, InputType, Select } from "../../../core/core";
import { useEffect, useState } from "react";
import { LembagaRepository } from "../lembaga";
import { ILembagaDTO } from "../model/lembaga";

export const AddLembagaForm = ({
  formValue,
  setFormValue,
  handleFormChange,
  handleSubmit,
  handleCancel,
  affirmativeText = "Submit",
}: {
  formValue: ILembagaDTO;
  setFormValue: React.Dispatch<React.SetStateAction<ILembagaDTO>>;
  handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  handleCancel: () => void;
  affirmativeText?: string;
}) => {
  const [listKategori, setListKategori] = useState<string[]>([]);

  useEffect(() => {
    LembagaRepository.getInstance()
      .getLembagaCategories()
      .then((res) => {
        setListKategori(res.kategori);
        setFormValue({
          ...formValue,
          kategori: res.kategori[0],
        });
      });
  }, []);

  return (
    <form>
      <Input
        type={InputType.text}
        placeholder="Nama Lembaga"
        id="nama"
        value={formValue.nama}
        onChange={handleFormChange}
      />
      <Select
        id="kategori"
        label="Kategori"
        values={new Map(listKategori.map((kategori) => [kategori, kategori]))}
        value={formValue.kategori}
        onChange={handleFormChange}
      />
      <div className="d-flex justify-content-center gap-2">
        <Button variant="primary" type="button" onClick={handleSubmit}>
          {affirmativeText}
        </Button>
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Batal
        </Button>
      </div>
    </form>
  );
};
