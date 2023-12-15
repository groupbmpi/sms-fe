import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import {
  ActivityForm,
  ActivityRepository,
  AddActivityForm,
  IActivityReportDTO,
} from "../feature/activity/activity";
import { IActivityReportQuery } from "../feature/activity/model/ActivityRequest";
import { IActivitiesResponseData } from "../feature/activity/model/ActivityResponse";
import moment from "moment";
import { PopupModal } from "../core/Modal";
import { toast } from "react-toastify";

const ActivityDetail = () => {
  const { id } = useParams();
  const [formValue, setFormValue] = useState<ActivityForm>(new ActivityForm());
  const [onEditMode, setOnEditMode] = useState<boolean>(false);
  const navigate = useNavigate();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const activityRepo = ActivityRepository.getInstance();

  const fetchDataActivities = useCallback(
    async (query: IActivityReportQuery): Promise<IActivitiesResponseData> => {
      const res: IActivitiesResponseData =
        await activityRepo.getAllActivityReport(query);
      return res;
    },
    [activityRepo]
  );

  useEffect(() => {
    if (typeof id === "undefined") return;

    fetchDataActivities({
      id: parseInt(id),
    }).then((res: IActivitiesResponseData) => {
      const activity: IActivityReportDTO = res.data[0];

      activity.jadwalMulai = moment
        .parseZone(activity.jadwalMulai)
        .local()
        .format()
        .slice(0, -6);
      activity.jadwalSelesai = moment
        .parseZone(activity.jadwalSelesai)
        .local()
        .format()
        .slice(0, -6);

      const newFormValue: ActivityForm = new ActivityForm();
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
  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    formValue.setActivityForm(formValue);

    formValue.startDate = new Date(formValue.startDate).toUTCString();
    formValue.endDate = new Date(formValue.startDate).toUTCString();

    const body: IActivityReportDTO = formValue.toDto();

    activityRepo.updateActivityReport(body, formValue.id).then(() => {
      toast.success("Berhasil mengubah kegiatan");
      navigate("/activity");
      setOnEditMode(false);
    }).catch((err) => {
      toast.error(err.response.data.meta.message);
      handleChangeEditMode()
    });
  };

  const handleChangeEditMode = () => {
    if (onEditMode) {
      if (typeof id === "undefined") return;

      fetchDataActivities({
        id: parseInt(id),
      }).then((res: IActivitiesResponseData) => {
        const activity: IActivityReportDTO = res.data[0];

        activity.jadwalMulai = moment
          .parseZone(activity.jadwalMulai)
          .local()
          .format()
          .slice(0, -6);
        activity.jadwalSelesai = moment
          .parseZone(activity.jadwalSelesai)
          .local()
          .format()
          .slice(0, -6);

        const newFormValue: ActivityForm = new ActivityForm();
        newFormValue.fromDto(activity);
        setFormValue(newFormValue);
      });
    }
    setOnEditMode(!onEditMode);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    formValue.setActivityForm(formValue);

    await activityRepo.deleteActivityReport(formValue.id);

    navigate("/activity");
  };

  const handleCancel = async () => {
    if (typeof id === "undefined") return;

    fetchDataActivities({
      id: parseInt(id),
    }).then((res: IActivitiesResponseData) => {
      const activity: IActivityReportDTO = res.data[0];

      activity.jadwalMulai = moment
        .parseZone(activity.jadwalMulai)
        .local()
        .format()
        .slice(0, -6);
      activity.jadwalSelesai = moment
        .parseZone(activity.jadwalSelesai)
        .local()
        .format()
        .slice(0, -6);

      const newFormValue: ActivityForm = new ActivityForm();
      newFormValue.fromDto(activity);
      setFormValue(newFormValue);
    });

    setOnEditMode(false);
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
            <button
              className="btn btn-danger ms-2"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Hapus
            </button>
          </div>
        </div>

        <AddActivityForm
          handleAddSuccessIndicator={handleAddSuccessIndicator}
          handleDeleteSuccessIndicator={handleDeleteSuccessIndicator}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          formValue={formValue}
          setFormValue={setFormValue}
          onEditMode={onEditMode}
          affirmativeText="Edit"
        />
      </div>
      <PopupModal
        show={showDeleteConfirm}
        title="Hapus Kegiatan"
        body="Apakah Anda yakin ingin menghapus kegiatan?"
        handleClose={() => setShowDeleteConfirm(false)}
        handleAffirmative={(e) => handleDelete(e)}
        handleDismiss={() => setShowDeleteConfirm(false)}
        affirmativeText="Ya"
      />
    </Container>
  );
};

export default ActivityDetail;
