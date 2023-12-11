import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { ActivityRepository, Calendar } from "../feature/activity/activity";
import { IActivitiesResponseData } from "../feature/activity/model/ActivityResponse";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { useCallback, useEffect, useState } from "react";
import { Select } from "../core/core";
import { UserRepository } from "../feature/user/user";
import { IActivityReportQuery } from "../feature/activity/model/ActivityRequest";

const ALL_LEMBAGA = "Semua Lembaga";

const Activity = () => {
  const [event, setEvent] = useState<EventSourceInput>([]);
  const [allFilter, setAllFilter] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>();
  
  const activityRepo = ActivityRepository.getInstance();
  const userRepo = UserRepository.getInstance();
  
  const fetchDataActivities = useCallback(async(query: IActivityReportQuery) : Promise<IActivitiesResponseData> => {
    const res : IActivitiesResponseData = await activityRepo.getAllActivityReport(query)
    return res;
  }, [activityRepo])

  const handleChangeFilter = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setFilter(value);
  };

  useEffect(() => {
    fetchDataActivities({}).then((res: IActivitiesResponseData) => {
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
  }, [activityRepo, fetchDataActivities]);


  useEffect(() => {
    userRepo
      .getAllCategories()
      .then((res) => {
        setAllFilter([ALL_LEMBAGA, ...res.data.lembaga]);
        setFilter(ALL_LEMBAGA);
      });
  }, [userRepo]);

  useEffect(() => {
    if(typeof filter === 'undefined') return;

    fetchDataActivities({
      lembaga: encodeURIComponent(filter),
    }).then((res: IActivitiesResponseData) => {
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
  }, [filter, fetchDataActivities]);

  return (
    <>
      <Container>
        <div className="d-flex py-2">
          <h3>Timeline dan Status Kegiatan</h3>
          <Select
            id="filter-lembaga"
            label="Filter Lembaga"
            value={filter as string}
            onChange={handleChangeFilter}
            values={new Map(allFilter.map((lembaga) => [lembaga, lembaga]))}
          />
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
