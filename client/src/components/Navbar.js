import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { AuthContext } from "../context/authContexts";

const NavbarComponent = () => {
  const { logout } = useContext(AuthContext);
  const { accessToken } = useContext(AuthContext);
  const [state, setState] = useState({ isOpen: false });
  const [user] = useState(jwtDecode(accessToken));
  const navigate = useNavigate();

  const toggle = () => {
    setState({
      isOpen: !state.isOpen,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" color="dark">
      <Container>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab"></span>
          <span className="navbar-toggler-bar navbar-kebab"></span>
          <span className="navbar-toggler-bar navbar-kebab"></span>
        </NavbarToggler>
        <Collapse isOpen={state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink>
                <a href="/perfil">Perfil</a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <a href="/avaliacoes">Avaliações</a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <a href={"/subsistema/" + user.subsystem}>Subsistema</a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <a href="" onClick={() => handleLogout()}>
                  Logout
                </a>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
