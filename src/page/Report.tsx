import { Container } from "react-bootstrap";
import { Input, InputType, Select } from "../core/Form";
import { useState } from "react";

const initialReportForm = {
  problemDescription: "",
  problemCategory: "",
  province: "",
};

const Report = () => {
  const [formValue, setFormValue] = useState(initialReportForm);

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  return (
    <Container>
      <h3>Report</h3>
      <div className="mb-3 px-5">
        <Input
          type={InputType.textarea}
          placeholder="Masukkan deskripsi masalah"
          id="problemDescription"
          value={formValue.problemDescription}
          onChange={handleFormChange}
          required
        />
        <Select
          id="problemCategory"
          label="Kategori Masalah"
          values={
            new Map([
              ["masalah1", "Masalah 1"],
              ["masalah2", "Masalah 2"],
            ])
          }
          value={formValue.problemCategory}
          onChange={handleFormChange}
        />
        <Select
          id="province"
          label="Provinsi"
          values={new Map([["jawaBarat", "Jawa Barat"]])}
          value={formValue.province}
          onChange={handleFormChange}
        />

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
