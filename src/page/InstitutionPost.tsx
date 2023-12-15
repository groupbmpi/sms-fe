import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AddLembagaForm, LembagaRepository } from "../feature/lembaga/lembaga";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InstitutionPost = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<{
    nama: string;
    kategori: string;
  }>({
    nama: "",
    kategori: "",
  });

  useEffect(() => {}, []);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    LembagaRepository.getInstance()
      .createLembaga(formValue)
      .then(() => {
        toast.success("Berhasil menambah lembaga");
        navigate("/institution");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleCancel = () => {
    navigate("/institution");
  };

  return (
    <Container>
      <h3>Tambah Lembaga</h3>
      <AddLembagaForm
        formValue={formValue}
        setFormValue={setFormValue}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Container>
  );
};

export default InstitutionPost;
