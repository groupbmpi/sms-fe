import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ActivityPost = () => {
  return (
    <Container className="my-2">
      <h4>Tambah Kegiatan Baru</h4>
      <form className="px-5">
        <div className="mb-3 px-5">
          <input
            type="text"
            className="form-control"
            id="activityName"
            aria-describedby="activityName"
            placeholder="Masukkan nama kegiatan"
          />
        </div>
        <div className="mb-3 px-5">
          <textarea
            className="form-control"
            id="activityGoal"
            rows={3}
            placeholder="Masukkan tujuan kegiatan"
            required
          ></textarea>
        </div>
        <div className="mb-3 px-5">
          <select className="form-control">
            <optgroup label="Bidang Program">
              <option value="advocation">Advokasi</option>
              <option value="education">Edukasi</option>
              <option value="empowerment">Pemberdayaan Masyarakat</option>
            </optgroup>
          </select>
        </div>
        <div className="mb-3 px-5">
          <input
            type="text"
            className="form-control"
            id="location"
            aria-describedby="location"
            placeholder="Masukkan Lokasi"
            required
          />
        </div>
        <div className="mb-3 px-5">
          <textarea
            required
            className="form-control"
            id="activityDescription"
            rows={3}
            placeholder="Masukkan deskripsi kegiatan"
          ></textarea>
        </div>
        <div className="mb-3 px-5">
          <select className="form-control">
            <optgroup label="Status Program">
              <option value="upcoming">Belum terlaksana</option>
              <option value="ongoing">Sedang berjalan</option>
              <option value="coordination">Tahap koordinasi</option>
              <option value="blocked">Sedang terkendala</option>
              <option value="done">Sudah terlaksana</option>
            </optgroup>
          </select>
        </div>
        <div className="mb-3 px-5">
          <textarea
            className="form-control"
            id="successIndicator"
            rows={3}
            placeholder="Masukkan indikator keberhasilan"
            required
          ></textarea>
        </div>
        <div className="mb-3 px-5">
          <textarea
            className="form-control"
            id="outputTarget"
            rows={3}
            placeholder="Masukkan target capaian"
            required
          ></textarea>
        </div>
        {/* Start date and end date in one line*/}
        <div className="mb-3 px-5 d-flex gap-3 align-items-center justify-content-between">
          <input
            type="date"
            className="form-control"
            id="startDate"
            aria-describedby="startDate"
            placeholder="Masukkan tanggal mulai"
            required
          />
          <p>s/d</p>
          <input
            type="date"
            className="form-control"
            id="endDate"
            aria-describedby="endDate"
            placeholder="Masukkan tanggal selesai"
            required
          />
        </div>
        <div className="mb-3 px-5">
          <textarea
            className="form-control"
            id="logistics"
            rows={3}
            placeholder="Masukkan kebutuhan logistik"
            required
          ></textarea>
        </div>
        <div className="mb-3 px-5">
          <select className="form-control">
            <optgroup label="Metode Pelaksanaan">
              <option value="daring">Daring</option>
              <option value="luring">Luring</option>
              <option value="hybrid">Hybrid</option>
              <option value="fgd">Forum Group Discussion</option>
              <option value="talkshow">Talkshow</option>
            </optgroup>
          </select>
        </div>
        <div className="mb-3 px-5">
          <input
            type="url"
            className="form-control"
            id="activityImage"
            aria-describedby="activityImage"
            placeholder="Masukkan link dokumen kegiatan"
            required
          />
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/activity">
            <button type="button" className="btn btn-secondary">
              Batal
            </button>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default ActivityPost;
