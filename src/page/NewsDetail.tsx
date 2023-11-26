import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams(); // TODO use this id to fetch news detail

  return (
    <Container className="py-2">
      <img
        src="https://via.placeholder.com/600x400"
        alt="News"
        className="img-fluid mx-auto d-block"
      />
      <h3 className="my-2">News Title</h3>
      <div className="text-body-tertiary fst-italic">
        16 November 2023 - John Doe
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum optio animi
        sapiente accusantium, sit minus ut illum. Hic quis ducimus harum, nobis
        sequi fuga, veniam praesentium qui voluptatum, beatae provident.
      </p>
    </Container>
  );
};

export default NewsDetail;
