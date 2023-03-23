import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { AuthContext } from "../../../context/authContexts";
import jwtDecode from "jwt-decode";
import NavbarComponent from "../../../components/Navbar";

const Evaluations = () => {
  const { accessToken } = useContext(AuthContext);
  const [user] = useState(jwtDecode(accessToken));
  const [evaluatees, setEvaluatees] = useState([]);

  const fetchEvaluatees = () => {
    axios
      .post("http://localhost:8800/api/grade/getEvaluated", {
        user: user.id,
        role: user.role,
        subsystem: user.subsystem,
        system: user.system,
      })
      .then((res) => {
        setEvaluatees(res.data);
      });
  };

  useEffect(() => {
    if (user.id) fetchEvaluatees(user);
  }, [user]);

  return (
    <>
      <NavbarComponent />
      <div className="mt-5 col-lg-10 col-sm-12 mx-auto">
        <h1 className="text-center">Avaliações</h1>
        <Row className="mx-auto d-flex ">
          {evaluatees.map((evaluatee) => (
            <Col lg={4}>
              <Card>
                <CardBody>
                  <p>
                    <h5>{evaluatee.name}</h5>
                    <p>{evaluatee.nameRole}</p>

                    <p>
                      {evaluatee.evaluated ? (
                        <Button color="primary" disabled>
                          Já foi avaliado
                        </Button>
                      ) : (
                        <a href={"/avaliacao/" + evaluatee.userId}>
                          <Button color="primary">Avaliar</Button>
                        </a>
                      )}
                    </p>
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Evaluations;
