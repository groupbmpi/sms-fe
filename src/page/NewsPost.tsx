import { useState } from "react";
import { Container } from "react-bootstrap";
import {
  AddNewsForm,
  ICreateNewsArgDto,
  NewsForm,
  NewsRepo,
} from "../feature/news/news";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewsPost = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<NewsForm>({
    title: "",
    detail: "",
    photoLink: "",
    publicationLink: "",
    date: new Date(),
  });

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;

    setFormValue({
      ...formValue,
      [id]: value,
    });
  };

  const handleSubmit = () => {
    const newsArgDto: ICreateNewsArgDto = {
      title: formValue.title,
      detail: formValue.detail,
      photoLink: formValue.photoLink,
      creatorId: 1,
    };

    NewsRepo.getInstance()
      .createNews(newsArgDto)
      .then(function () {
        toast.success("Berhasil menambah berita");
        navigate("/news");
      })
      .catch((err) => {
        toast.error(err.response.data.meta.message);
      });
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
