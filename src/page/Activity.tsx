import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { ActivityRepository, Calendar } from "../feature/activity/activity";
import { useEffect, useState } from "react";
import { IActivitiesResponseData } from "../feature/activity/model/ActivityResponse";
import { EventSourceInput } from "@fullcalendar/core/index.js";

const Activity = () => {
  const [event, setEvent] = useState<EventSourceInput>([]);
  const activityRepo = ActivityRepository.getInstance();

  useEffect(() => {
    console.log("HERE");
    const fetchData = async () : Promise<IActivitiesResponseData> => {
      const res : IActivitiesResponseData = await activityRepo.getAllActivityReport()
      return res;
    }
    
    fetchData().then((res: IActivitiesResponseData) => {
      const newEvent = res.data.map((activity) => {
        return {
          id: `${activity.id}`,
          title: activity.namaKegiatan,
          start: activity.jadwalMulai.replace('Z', ''),
          end: activity.jadwalSelesai.replace('Z', ''),
          editable: activity.isEditable,
          startEditable: activity.isEditable,
        };
      });

      setEvent(newEvent);
    })
  }, [activityRepo]);

  return (
    <>
      {/* <h1>{event.toString()}</h1> */}
      <Container>
        <div className="d-flex py-2">
          <h3>Timeline dan Status Kegiatan</h3>
          <ProtectedRoleComponent
            roleAllowed={[Role.ADMIN, Role.SUPERADMIN, Role.MITRA]}
            component={
              <Link to="/activity/new" className="ms-auto">
                <button className="btn btn-primary ms-auto">
                  Tambah Kegiatan
                </button>
              </Link>
            }
          />
        </div>
        <Calendar events={event} />
      </Container>
    </>
  );
};

export default Activity;
