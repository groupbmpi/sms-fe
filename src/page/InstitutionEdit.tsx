import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AddLembagaForm, LembagaRepository } from "../feature/lembaga/lembaga";
import { useNavigate, useParams } from "react-router-dom";
import { ILembagaDTO } from "../feature/lembaga/model/lembaga";
import { toast } from "react-toastify";

const InstitutionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<ILembagaDTO>({
    nama: "",
    kategori: "",
  });

  useEffect(() => {
    LembagaRepository.getInstance()
      .getAllLembaga({ id: parseInt(id!) })
      .then((res) => {
        setFormValue(res.data[0]);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/institution");
      });
  }, [id, navigate]);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    LembagaRepository.getInstance()
      .updateLembaga(
        {
          nama: formValue.nama,
          kategori: formValue.kategori,
        },
        parseInt(id!)
      )
      .then(() => {
        toast.success("Berhasil mengubah lembaga");
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
      <h3>Edit Lembaga</h3>
      <AddLembagaForm
        formValue={formValue}
        setFormValue={setFormValue}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        affirmativeText="Edit"
      />
    </Container>
  );
};

export default InstitutionEdit;
