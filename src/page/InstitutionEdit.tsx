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
    id: parseInt(id!),
    nama: "",
    kategori: "",
  });

  useEffect(() => {
    // TODO fetch lembaga by id and setFormValue (nama dan kategori based on fetched data)
    LembagaRepository.getInstance()
      .getAllLembaga({ id: parseInt(id!) })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/institution");
      });
  }, []);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO edit lembaga based of formvalue
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
