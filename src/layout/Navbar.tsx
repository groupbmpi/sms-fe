import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" sticky="top">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Kegiatan
            </Link>
            <Link to="/news" className="nav-link active">
              Berita
            </Link>
            <Link to="/forum" className="nav-link">
              Forum Diskusi
            </Link>
            <Link to="/problem-report" className="nav-link">
              Laporkan Masalah
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default NavigationBar;
