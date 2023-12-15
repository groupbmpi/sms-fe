import { useState } from "react";
import { Container } from "react-bootstrap";
import {
  AddNewsForm,
  ICreateNewsArgDto,
  NewsForm,
  NewsRepo,
} from "../feature/news/news";
import { useNavigate } from "react-router-dom";
import { Loading } from "../core/Loading";

const NewsPost = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

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
      [id]: id === 'date'
        ? new Date(value)
        : value
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const newsArgDto: ICreateNewsArgDto = {
      creatorId: 1,
      title: formValue.title,
      detail: formValue.detail,
      photoLink: formValue.photoLink,
      publicationLink: formValue.publicationLink,
      createdAt: formValue.date,
    };

    NewsRepo.getInstance()
      .createNews(newsArgDto)
      .then(function () {
        navigate("/news");
      })
      .finally(function () {
        setIsLoading(false);
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
