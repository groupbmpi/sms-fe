import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../feature/auth/hooks/Auth";

const NavigationItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "nav-link fw-bold" : "nav-link")}
    >
      {text}
    </NavLink>
  );
};

const NavigationBar = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavigationItem to="/activity" text="Kegiatan" />
              <NavigationItem to="/news" text="Berita" />
              {user && <NavigationItem to="/forum" text="Forum Diskusi" />}
              <NavigationItem to="/problem-report" text="Laporkan Masalah" />
              {user && <NavigationItem to="/profile" text="Profile" />}
              {!user && <NavigationItem to="/login" text="Login" />}
              {user && <NavigationItem to="/user" text="User" />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default NavigationBar;