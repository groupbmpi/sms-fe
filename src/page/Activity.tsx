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
import { getAllLembagaByKategori } from "../helper/Parser";
import moment from "moment-timezone";

const ALL_LEMBAGA = "Semua Lembaga";
const ALL_KATEGORI = "Semua Kategori";

const Activity = () => {
  const [event, setEvent] = useState<EventSourceInput>([]);
  const [allFilter, setAllFilter] = useState<{
    lembaga: string[];
    kategori: string[];
  }>({
    lembaga: [],
    kategori: [],
  });
  const [filter, setFilter] = useState<{
    "filter-lembaga": string;
    "filter-kategori": string;
  }>({
    "filter-lembaga": ALL_LEMBAGA,
    "filter-kategori": ALL_KATEGORI,
  });

  const activityRepo = ActivityRepository.getInstance();
  const userRepo = UserRepository.getInstance();

  const fetchDataActivities = useCallback(
    async (query: IActivityReportQuery): Promise<IActivitiesResponseData> => {
      const res: IActivitiesResponseData =
        await activityRepo.getAllActivityReport(query);
      return res;
    },
    [activityRepo]
  );

  const handleChangeFilter = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, id } = target;
    setFilter({
      ...filter,
      [id]: value,
    });
  };

  useEffect(() => {
    fetchDataActivities({}).then((res: IActivitiesResponseData) => {
      const newEvent = res.data.map((activity) => {
        return {
          id: `${activity.id}`,
          title: activity.namaKegiatan,
          start: moment(activity.jadwalMulai).tz("Asia/Jakarta").format().replace("Z", ""),
          end: moment(activity.jadwalSelesai).tz("Asia/Jakarta").format().replace("Z", ""),
          editable: activity.isEditable,
          startEditable: activity.isEditable,
        };
      });

      setEvent(newEvent);
    });
  }, [activityRepo, fetchDataActivities]);

  useEffect(() => {
    userRepo.getAllCategories().then((res) => {
      const lembagaParsed: string[] = [];

      res.data.lembaga.forEach((data) => {
        lembagaParsed.push(...data.lembaga);
      });

      setAllFilter({
        lembaga: [ALL_LEMBAGA, ...lembagaParsed],
        kategori: [ALL_KATEGORI, ...res.data.kategori],
      });
      setFilter({
        "filter-lembaga": ALL_LEMBAGA,
        "filter-kategori": ALL_KATEGORI,
      });
    });
  }, [userRepo]);

  useEffect(() => {
    if (typeof filter === "undefined") return;

    fetchDataActivities({
      lembaga: encodeURIComponent(filter["filter-lembaga"]),
      kategori: encodeURIComponent(filter["filter-kategori"]),
    }).then((res: IActivitiesResponseData) => {
      const newEvent = res.data.map((activity) => {
        return {
          id: `${activity.id}`,
          title: activity.namaKegiatan,
          start: moment(activity.jadwalMulai).tz("Asia/Jakarta").format().replace("Z", ""),
          end: moment(activity.jadwalSelesai).tz("Asia/Jakarta").format().replace("Z", ""),
          editable: activity.isEditable,
          startEditable: activity.isEditable,
        };
      });

      setEvent(newEvent);
    });
  }, [filter, fetchDataActivities]);

  useEffect(() => {
    userRepo.getAllCategories().then((res) => {
      let lembagaParsed: string[] = [];
      if (filter["filter-kategori"] === ALL_KATEGORI){

        res.data.lembaga.forEach((data) => {
          lembagaParsed.push(...data.lembaga);
        });
      }else{
        lembagaParsed = getAllLembagaByKategori(
          filter["filter-kategori"],
          res.data.lembaga
        );
      }

      setAllFilter((prev) => ({
        ...prev,
        lembaga: [ALL_LEMBAGA, ...lembagaParsed],
      }));
    });
  }, [filter, userRepo]);

  return (
    <>
      <Container>
        <div className="d-flex py-2">
          <h3>Timeline dan Status Kegiatan</h3>
          <Select
            id="filter-kategori"
            label="Filter Kategori"
            value={filter?.["filter-kategori"] || ALL_KATEGORI}
            onChange={handleChangeFilter}
            values={
              new Map(
                allFilter?.kategori.map((kategori) => [kategori, kategori])
              )
            }
          />
          <Select
            id="filter-lembaga"
            label="Filter Lembaga"
            value={filter?.["filter-lembaga"] || ALL_LEMBAGA}
            onChange={handleChangeFilter}
            values={
              new Map(allFilter?.lembaga.map((lembaga) => [lembaga, lembaga]))
            }
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
