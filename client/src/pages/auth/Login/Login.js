import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import "../../../css/styles.css";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../context/authContexts";

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
    <section className="DefaultPage">
      <section className="AuthPageBox">
        <section className="AuthPageTitleSection">
          <img src={logo} alt="Logo TESLA - UFMG" className="AuthPageIMG" />
          <h1 className="AuthPageTitle">Login</h1>
        </section>
        <Formik
          initialValues={{}}
          onSubmit={handleLogin}
          validationSchema={validationLogin}
        >
          <Form>
            <div className="FormikInputDiv">
              <Field
                name="username"
                className="FormikInputField"
                placeholder="Nome de usuário"
              />
              <div className="FormikErrorMessage">
                <ErrorMessage name="username" />
              </div>
            </div>
            <div className="FormikInputDiv">
              <Field
                type="password"
                name="password"
                className="FormikInputField"
                placeholder="Senha"
              />
              <div className="FormikErrorMessage">
                <ErrorMessage name="password" />
              </div>
            </div>
            {err && err}
            <div className="SubmitButtonDiv">
              <button className="SubmitButton" type="submit">
                Login
              </button>
            </div>
          </Form>
        </Formik>
        <section className="AuthPageLinksSection">
          <p className="AuthPageLinksText">
            Não possui uma conta?
            <br />
            <a href="/cadastro">Crie uma conta.</a>
          </p>
        </section>
      </section>
    </section>
  );
};

export default Login;
