import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
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
    <Navbar expand="lg" color="light">
      <NavbarBrand href="/">
        <img
          alt="Logo TESLA - UFMG"
          src={logo}
          style={{
            height: 60,
            width: 60,
          }}
        />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="NavbarToggle">
        <span className="navbar-toggler-bar navbar-kebab"></span>
        <span className="navbar-toggler-bar navbar-kebab"></span>
        <span className="navbar-toggler-bar navbar-kebab"></span>
      </NavbarToggler>
      <Collapse isOpen={state.isOpen} navbar className="Navbar">
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
    </Navbar>
  );
};

export default NavbarComponent;
