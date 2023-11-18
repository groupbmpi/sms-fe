import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();

  return (
    <Container className="py-2">
      <h4>News with id: {id}</h4>
    </Container>
  );
};

export default NewsDetail;
