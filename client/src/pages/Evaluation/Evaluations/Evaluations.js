import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import jwtDecode from "jwt-decode";

import { AuthContext } from "../../../context/authContexts";
import NavbarComponent from "../../../components/Navbar";
import "../../../css/styles.css";
import { EvaluationService } from "../../../services/Evaluation";

const Evaluations = () => {
  const { accessToken } = useContext(AuthContext);
  const [user] = useState(jwtDecode(accessToken));
  const [evaluatees, setEvaluatees] = useState([]);

  useEffect(() => {
    if (user.id)
      EvaluationService.fetchEvaluatees(user).then((res) => {
        setEvaluatees(res.data);
      });
  }, [user]);

  return (
    <section className="DefaultPage">
      <NavbarComponent />
      <div className="EvaluationsBox">
        <h1 className="EvaluationsTitle">Avaliações</h1>
        <div className="EvaluationsContent">
          {evaluatees.map((evaluatee) => (
            <Card className="EvaluationsCard">
              <CardBody>
                <div className="EvaluationsCardBody">
                  <h5>{evaluatee.name}</h5>
                  <p>{evaluatee.nameRole}</p>
                  {evaluatee.evaluated ? (
                    <button className="CardButton" disabled>
                      Já avaliado
                    </button>
                  ) : (
                    <button
                      className="CardButton"
                      color="primary"
                      onClick={() =>
                        (window.location.href =
                          "/avaliacao/" + evaluatee.userId)
                      }
                    >
                      Avaliar
                    </button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Evaluations;
