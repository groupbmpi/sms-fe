import { Container } from "react-bootstrap";

const Report = () => {
  return (
    <Container>
      <h3>Report</h3>
      <div className="mb-3 px-5">
        <textarea
          className="form-control my-2"
          id="newsDescription"
          rows={5}
          placeholder="Masukkan deskripsi berita"
        ></textarea>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Report;
