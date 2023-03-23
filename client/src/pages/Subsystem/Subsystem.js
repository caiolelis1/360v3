import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import BarChart from "../../components/BarChartSystem";
import { AuthContext } from "../../context/authContexts";
import jwtDecode from "jwt-decode";
import NavbarComponent from "../../components/Navbar";

const Subsystem = () => {
  const { accessToken } = useContext(AuthContext);
  const [user] = useState(jwtDecode(accessToken));
  const [subsystem, setSubsystem] = useState({});
  const [members, setMembers] = useState([]);
  const [grades, setGrades] = useState([]);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const fetchSubsystem = () => {
    axios
      .post("http://localhost:8800/api/subsystem/getSubsystem", {
        id: id,
        user: user,
      })
      .then((res) => {
        setSubsystem(res.data[0]);
      });
  };

  const fetchMembers = () => {
    axios
      .post("http://localhost:8800/api/member/getMemberBySubsystem", {
        subsystem: id,
      })
      .then((res) => {
        setMembers(res.data);
      });
  };

  const fetchGrades = (id, user) => {
    axios
      .post("http://localhost:8800/api/grade/getSubsystemGrades", {
        subsystem: id,
        user: user,
      })
      .then((res) => {
        setGrades(res.data);
      })
      .catch((err) => {
        navigate("/perfil");
      });
  };

  useEffect(() => {
    if (user.id) {
      fetchSubsystem();
      fetchMembers();
      fetchGrades(id, user);
    }
  }, [user]);

  return (
    <>
      <NavbarComponent />
      <div className="col-lg-10 col-sm-12 mx-auto mt-5">
        <Card>
          <CardBody>
            <h1>{subsystem?.nameSubsystem}</h1>
            <h2>
              <a href={"/sistema/" + subsystem?.idSystem}>
                {subsystem?.nameSystem}
              </a>
            </h2>
          </CardBody>
        </Card>
        <div>
          <h1 className="text-center">Notas</h1>
          <Row>
            {grades.map((grade) => (
              <div className="col-lg-4 col-sm-12">
                <h2 className="text-center">{grade.criteriaName}</h2>
                <h3 className="text-center">
                  Média: {Number(grade.average).toFixed(1)}
                </h3>
                {grade.count && (
                  <BarChart
                    grades={grade.count}
                    backgroundColor={grade.backgroundColor}
                    labels={grade.labels}
                  />
                )}
              </div>
            ))}
          </Row>
        </div>
        <div>
          <h1 className="text-center">Membros</h1>
          <Row>
            {members.map((member) => (
              <Col lg={3}>
                <a href={"/membro/" + member.userId}>
                  <Card>
                    <CardBody>
                      <CardTitle className="text-center">
                        {member.name}
                      </CardTitle>
                      <CardText className="text-center">
                        {member.nameRole}
                      </CardText>
                    </CardBody>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Subsystem;
