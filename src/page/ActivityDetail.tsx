import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { ActivityForm, ActivityRepository, AddActivityForm, IActivityReportDTO } from "../feature/activity/activity";
import { IActivityReportQuery } from "../feature/activity/model/ActivityRequest";
import { IActivitiesResponseData } from "../feature/activity/model/ActivityResponse";
import moment from "moment";

const ActivityDetail = () => {
  const { id } = useParams();
  const [formValue, setFormValue] = useState<ActivityForm>(new ActivityForm());
  const [onEditMode, setOnEditMode] = useState<boolean>(false);

  const activityRepo = ActivityRepository.getInstance();
  
  const fetchDataActivities = useCallback(async(query: IActivityReportQuery) : Promise<IActivitiesResponseData> => {
    const res : IActivitiesResponseData = await activityRepo.getAllActivityReport(query)
    return res;
  }, [activityRepo])

  useEffect(() => {
    if(typeof id === 'undefined') return

    fetchDataActivities({
      id: parseInt(id),
    }).then((res: IActivitiesResponseData) => {
        const activity : IActivityReportDTO = res.data[0];
        
        activity.jadwalMulai = moment.parseZone(activity.jadwalMulai).local().format().slice(0, -6)
        activity.jadwalSelesai = moment.parseZone(activity.jadwalSelesai).local().format().slice(0, -6)

        const newFormValue : ActivityForm = new ActivityForm();
        newFormValue.fromDto(activity);

        setFormValue(newFormValue);
      });
  }, [fetchDataActivities, id]);

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
      console.log("H")
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
      console.log(value)
      setFormValue({ ...formValue, [id]: value });
      formValue.setActivityForm(formValue);
      console.log(formValue);
    }
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    formValue.setActivityForm(formValue)

    formValue.startDate = new Date(formValue.startDate).toUTCString();
    formValue.endDate = new Date(formValue.startDate).toUTCString();
    
    const body : IActivityReportDTO = formValue.toDto()

    await activityRepo.updateActivityReport(body, formValue.id);
  };

  const handleChangeEditMode = () => {
    if (onEditMode) {
      if(typeof id === 'undefined') return

      fetchDataActivities({
        id: parseInt(id),
      }).then((res: IActivitiesResponseData) => {
          const activity : IActivityReportDTO = res.data[0];
          
          console.log(moment.parseZone(activity.jadwalMulai).local().format().slice(0, -6))
  
  
          activity.jadwalMulai = moment.parseZone(activity.jadwalMulai).local().format().slice(0, -6)
          activity.jadwalSelesai = moment.parseZone(activity.jadwalSelesai).local().format().slice(0, -6)
          console.log(activity);
          const newFormValue : ActivityForm = new ActivityForm();
          newFormValue.fromDto(activity);
          setFormValue(newFormValue);
        });
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
