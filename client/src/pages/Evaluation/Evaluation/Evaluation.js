import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FormGroup, Label, Input, CardBody, Button, Alert } from "reactstrap";
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
    <section className="DefaultPage">
      <NavbarComponent />
      <Alert className="EvaluationAlert">{msg}</Alert>
      <form onSubmit={(e) => handleClick(e)} className="EvaluationsBox">
        {!selfEvaluation && (
          <h1 className="EvaluationsTitle">{member?.name}</h1>
        )}
        {selfEvaluation && <h1 className="EvaluationsTitle">Autoavaliação</h1>}
        <div className="EvaluationsContent">
          <CardBody>
            {questions.map((question) => (
              <div className="EvaluationQuestionContainer">
                <h4 className="EvaluationQuestionTitle">{question.question}</h4>
                {question.text ? (
                  <FormGroup>
                    <Input
                      name={question.idquestion}
                      type="textarea"
                      onChange={handleChange}
                      required
                      className="EvaluationTextArea"
                    />
                  </FormGroup>
                ) : (
                  <div className="EvaluationRadioBoxes">
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
                <hr />
              </div>
            ))}

            <FormGroup check className="MessageCheckbox">
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
          <button className="SubmitButton EvaluationButton" type="submit">
            Avaliar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Evaluation;
