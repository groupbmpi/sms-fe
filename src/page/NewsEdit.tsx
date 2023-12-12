import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NewsForm, AddNewsForm } from "../feature/news/news";

const initialNewsForm: NewsForm = {
  newsTitle: "",
  newsDescription: "",
  newsImage: "",
  newsLink: "",
};

const NewsEdit = () => {
  const [formValue, setFormValue] = useState<NewsForm>(initialNewsForm);

  useEffect(() => {
    // TODO fetch news by id, and setFormValue with the data
  }, []);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleUpdate = () => {
    // TODO handle update
  };

  return (
    <Container className="my-2">
      <h4>Ubah Berita</h4>
      <AddNewsForm
        formValue={formValue}
        handleFormChange={handleFormChange}
        handleSubmit={handleUpdate}
      />
    </Container>
  );
};

export default NewsEdit;
