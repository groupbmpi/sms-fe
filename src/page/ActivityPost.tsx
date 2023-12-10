import { Container } from "react-bootstrap";
import { useState } from "react";
import { ActivityForm, AddActivityForm } from "../feature/activity/activity";

const ActivityPost = () => {
  const [formValue, setFormValue] = useState<ActivityForm>(new ActivityForm());

  const handleSubmit = () => {
    console.log(formValue);
    // TODO: handle submit
  };

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
    () => {
      const newSuccessIndicator = formValue.successIndicator;
      newSuccessIndicator.pop();
      setFormValue({
        ...formValue,
        successIndicator: newSuccessIndicator,
      });
    };
  };

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    console.log(target);
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
      console.log(id, value);
      setFormValue({ ...formValue, [id]: value });
    }
  };

  return (
    <Container className="my-2">
      <h4>Tambah Kegiatan Baru</h4>
      <AddActivityForm
        handleFormChange={handleFormChange}
        handleAddSuccessIndicator={handleAddSuccessIndicator}
        handleDeleteSuccessIndicator={handleDeleteSuccessIndicator}
        handleSubmit={handleSubmit}
        formValue={formValue}
        setFormValue={setFormValue}
      />
    </Container>
  );
};

export default ActivityPost;
