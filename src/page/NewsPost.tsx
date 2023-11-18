import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Input, InputType } from "../core/Form";

const NewsPost = () => {
  const [formValue, setFormValue] = useState({
    newsTitle: "",
    newsDescription: "",
    newsImage: "",
    newsLink: "",
  });

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSubmit = () => {
    console.log(formValue);
  };

  return (
    <Container className="my-2">
      <h4>Tambah Berita Baru</h4>
      <form className="px-5">
        <Input
          type={InputType.text}
          id="newsTitle"
          placeholder="Masukkan judul berita"
          value={formValue.newsTitle}
          onChange={handleFormChange}
        />
        <Input
          type={InputType.textarea}
          id="newsDescription"
          placeholder="Masukkan deskripsi berita"
          value={formValue.newsDescription}
          onChange={handleFormChange}
        />
        <Input
          type={InputType.url}
          id="newsImage"
          placeholder="Masukkan link gambar berita"
          value={formValue.newsImage}
          onChange={handleFormChange}
        />
        <Input
          type={InputType.url}
          id="newsLink"
          placeholder="Masukkan link publikasi"
          value={formValue.newsLink}
          onChange={handleFormChange}
        />
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
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
