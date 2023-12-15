import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IFormNewsByIdResponseData, INewsByIdRetDto, INewsIdArgDto, NewsRepo } from "../feature/news/news";
import { Loading } from "../core/Loading";
import { generateDateStringIdFormat, getNumberFromString } from "../helper/Parser";
import { ResponseType } from "../feature/response";

const NewsDetail = () => {
  const { id } = useParams();

  const [news, setNews] = useState<INewsByIdRetDto>({
    owner: {
      id: 0,
      name: '',
    },
    news: {
      id: 0,
      title: '',
      detail: '',
      photoLink: '',
      publicationLink: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      canModify: false,
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const newsArgDto: INewsIdArgDto = {
      id: getNumberFromString(id) as number,
    }

    NewsRepo.getInstance().getNewsById(newsArgDto)
      .then((response: ResponseType<IFormNewsByIdResponseData>) => {
        const data = response.data;

        const newsDto: INewsByIdRetDto = {
          owner: {
            ...data.owner,
          },
          news: {
            ...data.news,
            publicationLink: data.news.publicationLink 
              ? data.news.publicationLink 
              : "",
            createdAt: new Date(data.news.createdAt),
            updatedAt: new Date(data.news.updatedAt),
          },
        };

        setNews(newsDto);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className="py-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <img
            src={news.news.photoLink}
            alt="News"
            className="img-fluid mx-auto d-block"
          />
          <h3 className="my-2">{news.news.title}</h3>
          <div className="text-body-tertiary fst-italic">
            {generateDateStringIdFormat(news.news.updatedAt)} - {news.owner.name}
          </div>
          <p>{news.news.detail}</p>
        </>
      )}
    </Container>
  );
};

export default NewsDetail;
