import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsPost = () => {
  return (
    <Container className="my-2">
      <h4>Tambah Berita Baru</h4>
      <form className="px-5">
        <div className="mb-3 px-5">
          <input
            type="newsTitle"
            className="form-control"
            id="newsTitle"
            aria-describedby="newsTitle"
            placeholder="Masukkan judul berita"
          />
        </div>
        <div className="mb-3 px-5">
          <textarea
            className="form-control"
            id="newsDescription"
            rows={3}
            placeholder="Masukkan deskripsi berita"
          ></textarea>
        </div>
        <div className="mb-3 px-5">
          <input
            type="newsImage"
            className="form-control"
            id="newsImage"
            aria-describedby="newsImage"
            placeholder="Masukkan link gambar berita"
          />
        </div>
        <div className="mb-3 px-5">
          <input
            type="newsLink"
            className="form-control"
            id="newsLink"
            aria-describedby="newsLink"
            placeholder="Masukkan link publikasi"
          />
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/news">
            <button type="button" className="btn btn-secondary">
              Batal
            </button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default NewsPost;
