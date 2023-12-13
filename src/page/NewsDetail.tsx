import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IFormNewsByIdResponseData, INewsByIdRetDto, INewsIdArgDto, NewsRepo } from "../feature/news/news";
import { Loading } from "../core/Loading";
import { generateDateStringIdFormat, getNumberFromString } from "../helper/Parser";
import { ResponseType } from "../feature/response";

const NewsDetail = () => {
  const { id } = useParams(); // TODO use this id to fetch news detail

  const [news, setNews] = useState<INewsByIdRetDto>({
    id: 0,
    title: '',
    detail: '',
    photoLink: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }); // TODO make news type in NewsModel

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
            // src={news.photoLink}
            src="https://picsum.photos/200/300"
            alt="News"
            className="img-fluid mx-auto d-block"
          />
          <h3 className="my-2">{news.title}</h3>
          <div className="text-body-tertiary fst-italic">
            {generateDateStringIdFormat(news.updatedAt)} - {'John Doe'}
          </div>
          <p>{news.detail}</p>
        </>
      )}
    </Container>
  );
};

export default NewsDetail;
