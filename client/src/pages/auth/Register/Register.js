import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

import logo from "../../../assets/logo.svg";
import "../../../css/styles.css";
import { AuthService } from "../../../services/Auth";

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
      await axios.post(
        "https://360backend2023.vercel.app/api/auth/register",
        values
      );
    } catch (err) {
      setErr(err.response.data);
    }
    alert("Usuário criado!");
    navigate("/login");
  };

  const getFormData = (values) => {
    setSystem(values.system);
  };

  useEffect(() => {
    AuthService.fetchSystems().then((res) => {
      setSystems(res.data);
    });
  }, []);

  useEffect(() => {
    AuthService.fetchSubsystems(system).then((res) => {
      setSubsystems(res.data);
    });
  }, [system]);

  return (
    <section className="AuthPageBox">
      <section className="AuthPageTitleSection">
        <img src={logo} alt="Logo TESLA - UFMG" className="AuthPageIMG" />
        <h1 className="AuthPageTitle">Cadastro</h1>
      </section>
      <Formik
        initialValues={initialValues}
        onSubmit={handleClick}
        validationSchema={validationRegister}
      >
        {({ values }) => {
          getFormData(values);
          return (
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
              <div className="FormikInputDiv">
                <Field
                  type="password"
                  name="confirmPassword"
                  className="FormikInputField"
                  placeholder="Confirmar Senha"
                />
                <div className="FormikErrorMessage">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>
              <div className="FormikInputDiv">
                <Field
                  type="email"
                  name="email"
                  className="FormikInputField"
                  placeholder="E-mail"
                />
                <div className="FormikErrorMessage">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="FormikInputDiv">
                <Field
                  type="text"
                  name="name"
                  className="FormikInputField"
                  placeholder="Nome"
                />
                <div className="FormikErrorMessage">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="FormikSelectDiv">
                <label className="SelectLabel" for="inputSystem">
                  Sistema:
                </label>
                <Field
                  as="select"
                  name="system"
                  id="inputSystem"
                  className="SelectField"
                >
                  {systems?.map((system) => (
                    <option value={system.idSystem}>{system.nameSystem}</option>
                  ))}
                </Field>
              </div>
              <div className="FormikSelectDiv">
                <label className="SelectLabel" for="inputSubsystem">
                  Subsistema:
                </label>
                <Field
                  as="select"
                  name="subsystem"
                  id="inputSubsystem"
                  className="SelectField"
                >
                  {subsystems?.map((subsystem) => (
                    <option value={subsystem.idSubsystem}>
                      {subsystem.nameSubsystem}
                    </option>
                  ))}
                </Field>
              </div>
              {err && err}
              <div className="SubmitButtonDiv">
                <button className="SubmitButton" type="submit">
                  Cadastrar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <section className="AuthPageLinksSection">
        <p className="AuthPageLinksText">
          Já possui conta?{" "}
          <a className="StyledLink" href="/login">
            Entre.
          </a>
        </p>
      </section>
    </section>
  );
};

export default Register;
