import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Card, CardBody, Row, CardTitle, CardText, Col } from "reactstrap";
import BarChart from "../../components/BarChart";
import ShowFeedback from "../../components/ShowFeedback";
import { AuthContext } from "../../context/authContexts";
import NavbarComponent from "../../components/Navbar";

const Member = () => {
  const params = useParams();
  const id = params.id;

  const { accessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [member, setMember] = useState({});
  const [grades, setGrades] = useState([]);
  const [colleagues, setColleagues] = useState([]);
  const [ownPage, setOwnPage] = useState(false);

  const fetchMember = () => {
    axios
      .post("http://localhost:8800/api/member/getMemberPage", {
        id: id,
        user: user,
      })
      .then((res) => {
        if (res.data[0].idUser === user.id) setOwnPage(true);
        setMember(res.data[0]);
      })
      .catch((error) => {
        navigate("/perfil");
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
    setUser(jwt_decode(accessToken));
  }, []);

  useEffect(() => {
    if (user.id) fetchMember();
  }, [user]);

  useEffect(() => {
    if (member.idSubsystem) {
      fetchColleagues(id, member.idSubsystem);
      fetchGrades(id, user);
    }
  }, [member]);

  return (
    <>
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
            {ownPage && <a href="/avaliacoes">Avalie os membros!</a>}
          </CardBody>
        </Card>
        <div>
          <h1 className="text-center">Notas</h1>
          <Row>
            {grades.map((grade) => (
              <div className="col-lg-4 col-sm-12">
                <h2>{grade.criteriaName}</h2>
                {grade.text === "1" ? (
                  <ShowFeedback
                    texts={grade.grades}
                    evaluators={grade.evaluators}
                  />
                ) : (
                  <div>
                    <h3>Média: {grade.average.toFixed(1)}</h3>
                    {grade.grades && (
                      <BarChart
                        grades={grade.grades}
                        backgroundColor={grade.backgroundColor}
                        labels={grade.evaluators}
                      />
                    )}
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
    </>
  );
};

export default Member;
