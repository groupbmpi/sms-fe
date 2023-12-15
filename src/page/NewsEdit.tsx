import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  NewsForm,
  AddNewsForm,
  IUpdateNewsArgDto,
  NewsRepo,
  INewsByIdRetDto,
  IFormNewsByIdResponseData,
  INewsIdArgDto,
} from "../feature/news/news";
import { useNavigate, useParams } from "react-router-dom";
import { getNumberFromString } from "../helper/Parser";
import { ResponseType } from "../feature/response";
import { Loading } from "../core/Loading";

const NewsEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [ newsOwnerId, setNewsOwnerId ] = useState<number>(-1);

  const [formValue, setFormValue] = useState<NewsForm>({
    title: "",
    detail: "",
    photoLink: "",
    publicationLink: "",
    date: new Date(),
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const newsArgDto: INewsIdArgDto = {
      id: getNumberFromString(id) as number,
    };

    NewsRepo.getInstance()
      .getNewsById(newsArgDto)
      .then((response: ResponseType<IFormNewsByIdResponseData>) => {
        const data = response.data;

        const newsDto: INewsByIdRetDto = {
          owner: { 
            ...data.owner 
          },
          news: {
            ...data.news,
            publicationLink: data.news.publicationLink 
              ? data.news.publicationLink 
              : "",
            createdAt: new Date(data.news.createdAt),
            updatedAt: new Date(data.news.updatedAt),
          }
        };

        setNewsOwnerId(newsDto.owner.id);

        setFormValue({
          title: newsDto.news.title,
          detail: newsDto.news.detail,
          photoLink: newsDto.news.photoLink,
          publicationLink: newsDto.news.publicationLink,
          date: newsDto.news.updatedAt,
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
      [id]: id === 'date'
        ? new Date(value)
        : value,
    });
  };

  const handleUpdate = () => {
    if (newsOwnerId === -1) {
      return;
    }

    setIsLoading(true);

    const newsArgDto: IUpdateNewsArgDto = {
      id: getNumberFromString(id) as number,
      data: {
        title: formValue.title,
        detail: formValue.detail,
        photoLink: formValue.photoLink,
        updatedAt: formValue.date,
        publicationLink: formValue.publicationLink,
        creatorId: newsOwnerId,
      },
    };

    NewsRepo.getInstance()
      .updateNews(newsArgDto)
      .then(function () {
        navigate("/news");
      });
  };

  return (
    <Container className="my-2">
      <h4>Ubah Berita</h4>
      {isLoading ? (
        <Loading />
      ) : (
        <AddNewsForm
          formValue={formValue}
          handleFormChange={handleFormChange}
          handleSubmit={handleUpdate}
          affirmativeText="Edit"
        />
      )}
    </Container>
  );
};

export default NewsEdit;
