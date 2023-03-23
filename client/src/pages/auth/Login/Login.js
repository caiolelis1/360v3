import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { AuthContext } from "../../../context/authContexts";
import { Button, Card, CardBody, CardTitle, Col, Container } from "reactstrap";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const validationLogin = yup.object().shape({
    username: yup.string().required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Este campo é obrigatório"),
  });

  const handleLogin = async (values) => {
    try {
      await login(values);
      navigate("/perfil");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <Container>
      <Col xl={{ span: 8, offset: 2 }} className="col-8">
        <Card>
          <CardTitle>
            <h1 className="text-center">Login</h1>
          </CardTitle>
          <CardBody>
            <Formik
              initialValues={{}}
              onSubmit={handleLogin}
              validationSchema={validationLogin}
            >
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
                <div className="login-form-group">
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
                {err && err}
                <Button className="button" type="submit">
                  Login
                </Button>
              </Form>
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
