import { Link } from "react-router-dom";
import { Input, InputType } from "../../../core/core";
import { NewsForm } from "../news";

export const AddNewsForm = ({
  formValue,
  handleFormChange,
  handleSubmit,
}: {
  formValue: NewsForm;
  handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
}) => {
  return (
    <form className="px-5">
      <Input
        type={InputType.text}
        id="newsTitle"
        placeholder="Judul berita"
        value={formValue.newsTitle}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.textarea}
        id="newsDescription"
        placeholder="Deskripsi berita"
        value={formValue.newsDescription}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.url}
        id="newsImage"
        placeholder="Link gambar berita"
        value={formValue.newsImage}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.url}
        id="newsLink"
        placeholder="Link publikasi"
        value={formValue.newsLink}
        onChange={handleFormChange}
      />
      <div className="d-flex align-items-center justify-content-center gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={handleSubmit}
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
  );
};
