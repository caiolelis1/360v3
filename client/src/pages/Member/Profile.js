import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContexts";
import axios from "axios";
import { Card, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import BarChart from "../../components/BarChart";
import ShowFeedback from "../../components/ShowFeedback";
import jwtDecode from "jwt-decode";
import NavbarComponent from "../../components/Navbar";

const Profile = () => {
  const { accessToken } = useContext(AuthContext);
  const [user] = useState(jwtDecode(accessToken));
  const [member, setMember] = useState({});
  const [colleagues, setColleagues] = useState([]);
  const [grades, setGrades] = useState([]);

  const fetchMember = (id) => {
    axios
      .post("http://localhost:8800/api/member/getMemberPage", {
        id: id,
        user: user,
      })
      .then((res) => {
        setMember(res.data[0]);
      });
  };

  const fetchColleagues = (id, subsystem) => {
    axios
      .post("http://localhost:8800/api/member/getColleagues", {
        id: id,
        subsystem: subsystem,
      })
      .then((res) => {
        setColleagues(res.data);
      });
  };

  const fetchGrades = (id, user) => {
    axios
      .post("http://localhost:8800/api/grade/getMemberGrades", {
        id: id,
        user: user,
      })
      .then((res) => {
        setGrades(res.data);
      });
  };

  useEffect(() => {
    fetchMember(user.id);
    fetchGrades(user.id, user);
  }, [user]);

  useEffect(() => {
    if (member.idSubsystem) fetchColleagues(user.id, member.idSubsystem);
  }, [member]);

  return (
    <section className="DefaultPage">
      <NavbarComponent />
      <div className="col-10 mx-auto mt-5">
        <Card>
          <CardBody>
            <h1>{member?.name}</h1>
            <h2>
              {member?.nameRole} de{" "}
              <a href={"/subsistema/" + member?.idSubsystem}>
                {member?.nameSubsystem}
              </a>
            </h2>
            <h2>
              <a href={"/sistema/" + member?.idSystem}>{member?.nameSystem}</a>
            </h2>
            <a href="/avaliacoes">Avalie os membros!</a>
          </CardBody>
        </Card>
        <div>
          <h1 className="text-center">Notas</h1>
          <Row>
            {grades.map((grade) => (
              <div className="col-lg-4 col-sm-12">
                <h2>{grade.criteriaName}</h2>
                {grade.text ? (
                  <ShowFeedback
                    texts={grade.grades}
                    evaluators={grade.evaluators}
                  />
                ) : (
                  <div>
                    <h3>Média: {grade.average.toFixed(1)}</h3>
                    <BarChart
                      grades={grade.grades}
                      backgroundColor={grade.backgroundColor}
                      labels={grade.evaluators}
                    />
                  </div>
                )}
              </div>
            ))}
          </Row>
        </div>
        <div>
          <h1 className="text-center">Colegas</h1>
          <Row>
            {colleagues.map((colleague) => (
              <Col lg={3}>
                <a href={"/membro/" + colleague.userId}>
                  <Card>
                    <CardBody>
                      <CardTitle className="text-center">
                        {colleague.name}
                      </CardTitle>
                      <CardText className="text-center">
                        {colleague.nameRole}
                      </CardText>
                    </CardBody>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default Profile;
