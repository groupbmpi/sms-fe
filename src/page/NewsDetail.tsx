import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { NewsRepository } from "../feature/news/news";
import { Loading } from "../core/Loading";

const NewsDetail = () => {
  const { id } = useParams(); // TODO use this id to fetch news detail
  const [news, setNews] = useState<any>(); // TODO make news type in NewsModel
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO fetch news by id, and setNews with the data
    setIsLoading(true);
    NewsRepository.getInstance()
      .getNewsbyId(id!)
      .then((res) => {
        setNews(res);
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
            {news.updatedAt} - John Doe
          </div>
          <p>{news.detail}</p>
        </>
      )}
    </Container>
  );
};

export default NewsDetail;
