import { Fragment, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Evaluation from "../pages/Evaluation/Evaluation/Evaluation";
import Evaluations from "../pages/Evaluation/Evaluations/Evaluations";
import Profile from "../pages/Member/Profile";
import Member from "../pages/Member/Member";
import Subsystem from "../pages/Subsystem/Subsystem";
import { AuthContext } from "../context/authContexts";

const Private = ({ Item }) => {
  const { accessToken } = useContext(AuthContext);
  let signed = false;
  if (accessToken) signed = true;
  return signed > 0 ? <Item /> : <Navigate to="/login" />;
};

const RouterApp = () => {
  return (
    <>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<Private Item={Profile} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/perfil" element={<Private Item={Profile} />} />
            <Route path="/membro/:id" element={<Private Item={Member} />} />
            <Route
              path="/subsistema/:id"
              element={<Private Item={Subsystem} />}
            />
            <Route
              path="/avaliacoes"
              element={<Private Item={Evaluations} />}
            />
            <Route
              path="/avaliacao/:id"
              element={<Private Item={Evaluation} />}
            />
            <Route path="*" element={<Private Item={Profile} />} />
          </Routes>
        </Fragment>
      </Router>
    </>
  );
};

export default RouterApp;
