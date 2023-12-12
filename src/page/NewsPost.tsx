import { useState } from "react";
import { Container } from "react-bootstrap";

import { NewsForm, AddNewsForm } from "../feature/news/news";

const initialNewsForm: NewsForm = {
  newsTitle: "",
  newsDescription: "",
  newsImage: "",
  newsLink: "",
};

const NewsPost = () => {
  const [formValue, setFormValue] = useState<NewsForm>(initialNewsForm);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSubmit = () => {
    console.log(formValue);
  };

  return (
    <Container className="my-2">
      <h4>Tambah Berita Baru</h4>
      <AddNewsForm
        formValue={formValue}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default NewsPost;
