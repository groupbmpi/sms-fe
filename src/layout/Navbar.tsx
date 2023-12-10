import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdAccountCircle } from "react-icons/md";

import {
  ProtectedRoleComponent,
  Role,
  useAuth,
} from "../feature/auth-and-profile/auth-and-profile";

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

const NavigationDropdownItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <NavDropdown.Item>
      <NavLink to={to} className="dropdown-item">
        {text}
      </NavLink>
    </NavDropdown.Item>
  );
};

const NavigationBar = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    // TODO: handle logout
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-between"
          >
            <Nav>
              <NavigationItem to="/activity" text="Kegiatan" />
              <NavigationItem to="/news" text="Berita" />
              {user && <NavigationItem to="/forum" text="Forum Diskusi" />}
              <NavigationItem to="/problem-report" text="Laporkan Masalah" />
              {!user && <NavigationItem to="/login" text="Login" />}
              {user && (
                <ProtectedRoleComponent
                  roleAllowed={[Role.ADMIN, Role.SUPERADMIN]}
                  component={<NavigationItem to="/user" text="User" />}
                />
              )}
            </Nav>
            <Nav className="d-flex align-items-center">
              {user && <MdAccountCircle size={20} />}

              {user && (
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                  <NavigationDropdownItem to="/profile" text="Profile" />
                  <NavDropdown.Divider />
                  <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default NavigationBar;
