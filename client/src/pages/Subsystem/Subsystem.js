import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { AuthContext } from "../../context/authContexts";
import BarChart from "../../components/BarChartSystem";
import NavbarComponent from "../../components/Navbar";
import "../../css/styles.css";
import team from "../../assets/team.png";
import { SubsystemService } from "../../services/Subsystem";

const Subsystem = () => {
  const { accessToken } = useContext(AuthContext);
  const [user] = useState(jwtDecode(accessToken));
  const [subsystem, setSubsystem] = useState({});
  const [members, setMembers] = useState([]);
  const [grades, setGrades] = useState([]);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      SubsystemService.fetchSubsystem(id, user).then((res) => {
        setSubsystem(res.data[0]);
      });
      SubsystemService.fetchMembers(id).then((res) => {
        setMembers(res.data);
      });
      SubsystemService.fetchGrades(id, user)
        .then((res) => {
          setGrades(res.data);
        })
        .catch(() => {
          navigate("/perfil");
        });
    }
  }, [user]);

  return (
    <section className="DefaultPage">
      <NavbarComponent />
      <div className="col-lg-10 mx-auto mt-5">
        <div className="MembersInfoContainer">
          <div className="MemberInfo1">
            <img src={team} alt="Logo TESLA - UFMG" className="MembersIMG" />
            <h2>{subsystem?.nameSubsystem}</h2>
          </div>
          <div className="MemberInfo2">
            <h3 className="MemberInfoSubsystem">
              Subsistema de {subsystem?.nameSystem}
            </h3>
            <a className="MemberInfoLink StyledLink" href="/avaliacoes">
              Avalie os membros!
            </a>
          </div>
        </div>
        <div className="GradesBox">
          <h1 className="GradesTitle">Notas</h1>
          <div className="GradesContent">
            {grades.map((grade) => (
              <div className="ResultsCard">
                <p className="ChartTitle">{grade.criteriaName}</p>
                <p className="ChartText">Média: {grade.average.toFixed(1)}</p>
                {grade.count && (
                  <BarChart
                    grades={grade.count}
                    backgroundColor={grade.backgroundColor}
                    labels={grade.labels}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="FriendsBox">
          <h1 className="GradesTitle">Membros</h1>
          <div className="FriendsContent">
            {members.map((member) => (
              <div className="FriendsCard">
                <a
                  className="FriendsName StyledLink"
                  href={"/membro/" + member.userId}
                >
                  {member.name}
                </a>
                <p>{member.nameRole}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subsystem;
