import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NewsForm, AddNewsForm, IUpdateNewsArgDto, NewsRepo, INewsByIdRetDto, IFormNewsByIdResponseData, INewsIdArgDto } from "../feature/news/news";
import { useNavigate, useParams } from "react-router-dom";
import { getNumberFromString } from "../helper/Parser";
import { ResponseType } from "../feature/response";
import { Loading } from "../core/Loading";

const NewsEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // TODO use this id to fetch news detail

  const [formValue, setFormValue] = useState<NewsForm>({
    title: "",
    detail: "",
    photoLink: "",
    publicationLink: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO fetch news by id, and setNews with the data
    setIsLoading(true);

    const newsArgDto: INewsIdArgDto = {
      id: getNumberFromString(id) as number,
    }

    NewsRepo.getInstance().getNewsById(newsArgDto)
      .then((response: ResponseType<IFormNewsByIdResponseData>) => {
        const data = response.data;

        const newsDto: INewsByIdRetDto = {
          id: data.id,
          title: data.title,
          detail: data.detail,
          photoLink: data.photoLink,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };

        setFormValue({
          title: newsDto.title,
          detail: newsDto.detail,
          photoLink: newsDto.photoLink,
          publicationLink: "",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;

    setFormValue({ 
      ...formValue, 
      [id]: value 
    });
  };

  const handleUpdate = () => {
    console.log('here');

    setIsLoading(true);

    const newsArgDto: IUpdateNewsArgDto = {
      id: getNumberFromString(id) as number,
      data: {
        title: formValue.title,
        detail: formValue.detail,
        photoLink: formValue.photoLink,
      }
    };

    NewsRepo.getInstance().updateNews(newsArgDto)
      .then(function () {
        alert('Berhasil mengedit berita');

        navigate('/news');
      });
  };

  return (
    <Container className="my-2">
      <h4>Ubah Berita</h4>
      { isLoading
        ? <Loading />
        : <AddNewsForm
          formValue={formValue}
          handleFormChange={handleFormChange}
          handleSubmit={handleUpdate}
        />
      }
    </Container>
  );
};

export default NewsEdit;
