import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { ActivityForm, AddActivityForm } from "../feature/activity/activity";

const ActivityDetail = () => {
  const { id } = useParams();
  const [formValue, setFormValue] = useState<ActivityForm>(new ActivityForm());
  const [onEditMode, setOnEditMode] = useState<boolean>(false);

  useEffect(() => {
    // TODO Fetch activity by id
  }, []);

  const handleAddSuccessIndicator = () => {
    const newSuccessIndicator = formValue.successIndicator;
    newSuccessIndicator.push({
      indicator: "",
      target: 0,
    });
    setFormValue({
      ...formValue,
      successIndicator: newSuccessIndicator,
    });
  };

  const handleDeleteSuccessIndicator = () => {
    const newSuccessIndicator = formValue.successIndicator;
    newSuccessIndicator.pop();
    setFormValue({
      ...formValue,
      successIndicator: newSuccessIndicator,
    });
  };

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    if (id.includes("successIndicator") || id.includes("outputTarget")) {
      if (id.includes("successIndicator")) {
        const idx = parseInt(id[id.length - 1]) - 1;
        const newSuccessIndicator = formValue.successIndicator;
        newSuccessIndicator[idx].indicator = value;
      } else {
        const idx = parseInt(id[id.length - 1]) - 1;
        const newSuccessIndicator = formValue.successIndicator;
        newSuccessIndicator[idx].target = parseInt(value);
      }
      setFormValue({
        ...formValue,
        successIndicator: formValue.successIndicator,
      });
    } else {
      setFormValue({ ...formValue, [id]: value });
    }
  };

  const handleSubmit = () => {
    console.log(formValue);
  };

  const handleChangeEditMode = () => {
    if (onEditMode) {
      // If previously on edit mode
      // TODO change formValue to sync with the database
    }

    setOnEditMode(!onEditMode);
  };

  const handleDelete = () => {
    // TODO delete activity based on Id
  };

  return (
    <Container>
      <div className="my-2">
        <div className="d-flex justify-content-between my-2">
          <h3>Detail Kegiatan</h3>
          <div>
            <button
              className={`btn ${onEditMode ? "btn-warning" : "btn-primary"}`}
              onClick={handleChangeEditMode}
            >
              {onEditMode ? "Batal Ubah" : "Ubah"}
            </button>
            <button className="btn btn-danger ms-2" onClick={handleDelete}>
              Hapus
            </button>
          </div>
        </div>

        <AddActivityForm
          handleAddSuccessIndicator={handleAddSuccessIndicator}
          handleDeleteSuccessIndicator={handleDeleteSuccessIndicator}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
          formValue={formValue}
          setFormValue={setFormValue}
          onEditMode={onEditMode}
        />
      </div>
    </Container>
  );
};

export default ActivityDetail;
