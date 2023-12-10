import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  ProtectedRoleComponent,
  Role,
} from "../feature/auth-and-profile/auth-and-profile";
import { Calendar } from "../feature/activity/activity";
import { useEffect, useState } from "react";
import { Select } from "../core/core";
import { UserRepository } from "../feature/user/user";

const ALL_LEMBAGA = "Semua Lembaga";

const Activity = () => {
  const [allFilter, setAllFilter] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    UserRepository.getInstance()
      .getAllCategories()
      .then((res) => {
        setAllFilter([ALL_LEMBAGA, ...res.data.lembaga]);
        setFilter(ALL_LEMBAGA);
      });
  }, []);

  const handleChangeFilter = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setFilter(value);
  };

  useEffect(() => {
    console.log(filter);
    // TODO fetch activity based on filter
  }, [filter]);

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
        <Calendar events={[]} />
      </Container>
    </>
  );
};

export default Activity;
