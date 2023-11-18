import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Special title treatment",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut natus odit molestias, soluta sit dolor! Ea sapiente est asperiores enim tempore dolores repellendus vel animi, odit, unde, tenetur blanditiis? Modi.",
    },
  ]);

  return (
    <Container>
      <div className="d-flex py-2">
        <h3>Berita</h3>
        <Link to="/news/new" className="ms-auto">
          <Button variant="primary" className="ms-auto">
            Tambah Berita
          </Button>
        </Link>
      </div>
      {news.map((item) => (
        <Card className="p-1 my-2">
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.body.substring(0, 100)}</Card.Text>
            <Link to={`/news/${item.id}`}>
              <Button variant="primary">Read More</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default News;
