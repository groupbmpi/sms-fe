import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AddLembagaForm } from "../feature/lembaga/lembaga";
import { useNavigate, useParams } from "react-router-dom";

const InstitutionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<any>({
    id: parseInt(id!),
    nama: "",
    kategori: "",
  });

  useEffect(() => {
    // TODO fetch lembaga by id and setFormValue (nama dan kategori based on fetched data)
  }, []);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(formValue); // TODO edit lembaga based of formvalue
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
      />
    </Container>
  );
};

export default InstitutionEdit;
