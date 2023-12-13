import { useState } from "react";
import { Container } from "react-bootstrap";
import { AddNewsForm, ICreateNewsArgDto, NewsForm, NewsRepo } from "../feature/news/news";
import { useNavigate } from "react-router-dom";

const NewsPost = () => {
  console.log('here0');

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [formValue, setFormValue] = useState<NewsForm>({
    title: "",
    detail: "",
    photoLink: "",
    publicationLink: "",
  });

  const handleFormChange = (e: React.ChangeEvent) => {
    console.log('here');

    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;

    setFormValue({ 
      ...formValue, 
      [id]: value 
    });
  };

  const handleSubmit = () => {
    console.log('here');

    setIsLoading(true);

    const newsArgDto: ICreateNewsArgDto = {
      title: formValue.title,
      detail: formValue.detail,
      photoLink: formValue.photoLink,
      creatorId: 1,
    };

    console.log(newsArgDto);

    NewsRepo.getInstance().createNews(newsArgDto)
      .then(function () {
        alert('Berhasil menambahkan berita');

        navigate('/news');
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
