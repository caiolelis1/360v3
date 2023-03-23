import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button, Card, CardTitle, Container, Col, CardBody } from "reactstrap";

const initialValues = { system: "1", subsystem: "1" };

const Register = () => {
  const [system, setSystem] = useState(1);
  const [systems, setSystems] = useState([]);
  const [subsystems, setSubsystems] = useState([]);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const validationRegister = yup.object().shape({
    username: yup.string().required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não conferem")
      .required("Este campo é obrigatório"),
    email: yup
      .string()
      .required("Este campo é obrigatório")
      .email("Este não é um e-mail váilido"),
    name: yup.string().required("Este campo é obrigatório"),
  });

  const handleClick = async (values) => {
    try {
      await axios.post("http://localhost:8800/api/auth/register", values);
    } catch (err) {
      setErr(err.response.data);
    }
    alert("Usuário criado!");
    navigate("/login");
  };

  const getFormData = (values) => {
    setSystem(values.system);
  };

  const fetchSystems = () => {
    axios
      .post("http://localhost:8800/api/system/getSystems", {})
      .then((res) => {
        setSystems(res.data);
      });
  };

  const fetchSubsystems = (id) => {
    axios
      .post("http://localhost:8800/api/subsystem/getSubsystemBySystem", {
        id: id,
      })
      .then((res) => {
        setSubsystems(res.data);
      });
  };

  useEffect(() => {
    fetchSystems();
  }, []);

  useEffect(() => {
    fetchSubsystems(system);
  }, [system]);

  return (
    <Container>
      <Col>
        <Card>
          <CardTitle>
            <h1 className="text-center">Cadastro</h1>
          </CardTitle>
          <CardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={handleClick}
              validationSchema={validationRegister}
            >
              {({ values }) => {
                getFormData(values);
                return (
                  <Form className="login-form">
                    <div className="mb-3">
                      <Field
                        name="username"
                        className="form-control"
                        placeholder="Nome de usuário"
                      />
                      <ErrorMessage
                        component="span"
                        name="username"
                        className="form-error"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Senha"
                      />
                      <ErrorMessage
                        component="span"
                        name="password"
                        className="form-error"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirmar Senha"
                      />
                      <ErrorMessage
                        component="span"
                        name="confirmPassword"
                        className="form-error"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="E-mail"
                      />
                      <ErrorMessage
                        component="span"
                        name="email"
                        className="form-error"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nome"
                      />
                      <ErrorMessage
                        component="span"
                        name="name"
                        className="form-error"
                      />
                    </div>
                    <div className="mb-3">
                      <label for="inputSystem">Sistema:</label>
                      <Field
                        as="select"
                        name="system"
                        id="inputSystem"
                        className="form-control"
                      >
                        {systems?.map((system) => (
                          <option value={system.idSystem}>
                            {system.nameSystem}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className="mb-3">
                      <label for="inputSubsystem">Subsistema:</label>
                      <Field
                        as="select"
                        name="subsystem"
                        id="inputSubsystem"
                        className="form-control"
                      >
                        {subsystems?.map((subsystem) => (
                          <option value={subsystem.idSubsystem}>
                            {subsystem.nameSubsystem}
                          </option>
                        ))}
                      </Field>
                    </div>
                    {err && err}
                    <Button className="button" type="submit">
                      Cadastrar
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Register;
