import { Link } from "react-router-dom";
import { Input, InputType } from "../../../core/core";
import { NewsForm } from "../news";
import { generateDateQueryStringFormat } from "../../../helper/Parser";

export const AddNewsForm = ({
  formValue,
  handleFormChange,
  handleSubmit,
  affirmativeText = "Submit",
}: {
  formValue: NewsForm;
  handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  affirmativeText?: string;
}) => {
  return (
    <form className="px-5">
      <Input
        type={InputType.text}
        id="title"
        placeholder="Judul berita"
        value={formValue.title}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.textarea}
        id="detail"
        placeholder="Deskripsi berita"
        value={formValue.detail}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.date}
        id="date"
        placeholder="Tanggal berita"
        value={`${generateDateQueryStringFormat(formValue.date)}`}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.url}
        id="photoLink"
        placeholder="Link gambar berita"
        value={formValue.photoLink}
        onChange={handleFormChange}
      />
      <Input
        type={InputType.url}
        id="publicationLink"
        placeholder="Link publikasi"
        value={formValue.publicationLink}
        onChange={handleFormChange}
      />
      <div className="d-flex align-items-center justify-content-center gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {affirmativeText}
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
