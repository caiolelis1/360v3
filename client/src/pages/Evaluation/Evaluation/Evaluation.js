import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { AuthContext } from "../../../context/authContexts";
import jwtDecode from "jwt-decode";
import NavbarComponent from "../../../components/Navbar";

const Evaluation = () => {
  const { accessToken } = useContext(AuthContext);
  const [user] = useState(jwtDecode(accessToken));
  const [member, setMember] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selfEvaluation, setSelfEvaluation] = useState(false);
  const [msg, setMsg] = useState("");
  const [inputs, setInputs] = useState();
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const fetchMember = () => {
    axios
      .post("http://localhost:8800/api/member/getMemberEvaluation", {
        id: id,
        user: user,
      })
      .then((res) => {
        setMember(res.data[0]);
      })
      .catch((error) => {
        navigate("/avaliacoes");
      });
  };

  const fetchMessage = () => {
    axios
      .post("http://localhost:8800/api/grade/getMsg", {
        id: id,
        role: member.idRole,
        user: user,
      })
      .then((res) => {
        setMsg(res.data);
      });
  };

  const fetchQuestions = () => {
    axios
      .post("http://localhost:8800/api/grade/getQuestions", {
        id: id,
        role: member.idRole,
        user: user,
      })
      .then((res) => {
        setQuestions(res.data);
      });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    setVisible(document.querySelector(".messageCheckbox").checked);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/api/grade/insertGrades", {
        evaluatorId: user.id,
        evaluatedId: member.idUser,
        inputs: inputs,
        visible: visible,
      })
      .then((res) => {
        console.log("tenho que navegar para outra página!!");
        navigate("/avaliacoes");
      });
  };

  useEffect(() => {
    if (user.id) fetchMember();
  }, [user]);

  useEffect(() => {
    if (member.idUser && member.idUser === user.id) setSelfEvaluation(true);
    if (member.name) {
      fetchQuestions();
      fetchMessage();
    }
  }, [member]);

  return (
    <>
      <NavbarComponent />
      <div className="col-lg-9 col-sm-12 mx-auto mt-5">
        <h4 className="text-center">{msg}</h4>
        <form onSubmit={(e) => handleClick(e)}>
          <Card>
            <CardTitle>
              <h2 className="text-center mt-3">{member?.name}</h2>
              {selfEvaluation && <h3 className="text-center">Autoavaliação</h3>}
            </CardTitle>
            <CardBody>
              {questions.map((question) => (
                <div className="mb-5">
                  <h3 className="text-center">{question.question}</h3>
                  <div className="d-flex justify-content-center">
                    {question.text ? (
                      <FormGroup>
                        <Input
                          name={question.idquestion}
                          type="textarea"
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    ) : (
                      <div>
                        <FormGroup
                          check
                          className="form-check-radio form-check-inline"
                        >
                          <Label className="form-check-label">
                            <Input
                              type="radio"
                              name={question.idquestion}
                              value="1"
                              onChange={handleChange}
                              required
                            />
                            Nunca<span className="form-check-sign"></span>
                          </Label>
                        </FormGroup>
                        <FormGroup
                          check
                          className="form-check-radio form-check-inline"
                        >
                          <Label className="form-check-label">
                            <Input
                              type="radio"
                              name={question.idquestion}
                              value="2"
                              onChange={handleChange}
                              required
                            />
                            Raramente<span className="form-check-sign"></span>
                          </Label>
                        </FormGroup>
                        <FormGroup
                          check
                          className="form-check-radio form-check-inline"
                        >
                          <Label className="form-check-label">
                            <Input
                              type="radio"
                              name={question.idquestion}
                              value="3"
                              onChange={handleChange}
                              required
                            />
                            Às vezes<span className="form-check-sign"></span>
                          </Label>
                        </FormGroup>
                        <FormGroup
                          check
                          className="form-check-radio form-check-inline"
                        >
                          <Label className="form-check-label">
                            <Input
                              type="radio"
                              name={question.idquestion}
                              value="4"
                              onChange={handleChange}
                              required
                            />
                            Frequentemente
                            <span className="form-check-sign"></span>
                          </Label>
                        </FormGroup>
                        <FormGroup
                          check
                          className="form-check-radio form-check-inline"
                        >
                          <Label className="form-check-label">
                            <Input
                              type="radio"
                              name={question.idquestion}
                              value="5"
                              onChange={handleChange}
                              required
                            />
                            Sempre<span className="form-check-sign"></span>
                          </Label>
                        </FormGroup>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <FormGroup check>
                <Label check>
                  <Input
                    onChange={handleCheckbox}
                    name="visible"
                    type="checkbox"
                    className="messageCheckbox"
                  />{" "}
                  Quer enviar seus textos de maneira não anônima?
                  <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </FormGroup>
            </CardBody>

            <Button
              type="submit"
              className="col-lg-3 col-sm-12"
              color="primary"
            >
              Avaliar
            </Button>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Evaluation;
