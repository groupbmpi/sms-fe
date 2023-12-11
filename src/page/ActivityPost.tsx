import { Container } from "react-bootstrap";
import { useState } from "react";
import { ActivityForm, ActivityRepository, AddActivityForm, IActivityReportDTO } from "../feature/activity/activity";
import { useNavigate } from "react-router-dom";
// import { Response } from "../feature/response";
const ActivityPost = () => {
  const [formValue, setFormValue] = useState<ActivityForm>(new ActivityForm());
  const activityRepository = ActivityRepository.getInstance();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    
    formValue.setActivityForm(formValue)

    formValue.startDate = new Date(formValue.startDate).toUTCString();
    formValue.endDate = new Date(formValue.startDate).toUTCString();

    const body : IActivityReportDTO = formValue.toDto()
    await activityRepository.createActivityReport(body);
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
    formValue.setActivityForm(formValue);
  };

  const handleDeleteSuccessIndicator = () => {
      const newSuccessIndicator = formValue.successIndicator;
      
      newSuccessIndicator.pop();


      setFormValue({
        ...formValue,
        successIndicator: newSuccessIndicator,
      });

      formValue.setActivityForm(formValue);
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
      formValue.setActivityForm(formValue);
    } else {
      setFormValue({ ...formValue, [id]: value });
      formValue.setActivityForm(formValue);
    }
  };

  const handleCancel = () => {
    navigate("/activity")
  }

  return (
    <Container className="my-2">
      <h4>Tambah Kegiatan Baru</h4>
      <AddActivityForm
        handleFormChange={handleFormChange}
        handleAddSuccessIndicator={handleAddSuccessIndicator}
        handleDeleteSuccessIndicator={handleDeleteSuccessIndicator}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        formValue={formValue}
        setFormValue={setFormValue}
      />
    </Container>
  );
};

export default ActivityPost;
