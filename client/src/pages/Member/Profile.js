import React, { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

import ShowFeedback from "../../components/ShowFeedback";
import { AuthContext } from "../../context/authContexts";
import NavbarComponent from "../../components/Navbar";
import BarChart from "../../components/BarChart";
import profile from "../../assets/user.png";
import "../../css/styles.css";

const Profile = () => {
  const { accessToken } = useContext(AuthContext);
  const [user] = useState(jwtDecode(accessToken));
  const [member, setMember] = useState({});
  const [colleagues, setColleagues] = useState([]);
  const [grades, setGrades] = useState([]);

  const fetchMember = (id) => {
    axios
      .post("http://localhost:8800/api/member/getMemberPage", {
        id: id,
        user: user,
      })
      .then((res) => {
        setMember(res.data[0]);
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
    fetchMember(user.id);
    fetchGrades(user.id, user);
  }, [user]);

  useEffect(() => {
    if (member.idSubsystem) fetchColleagues(user.id, member.idSubsystem);
  }, [member]);

  return (
    <section className="DefaultPage">
      <NavbarComponent />
      <div className="col-10 mx-auto mt-5">
        <div className="MembersInfoContainer">
          <div className="MemberInfo1">
            <img src={profile} alt="Logo TESLA - UFMG" className="MembersIMG" />
            <h2>{member?.name}</h2>
            <p>{member?.nameSystem}</p>
          </div>
          <div className="MemberInfo2">
            <h3 className="MemberInfoSubsystem">
              {member?.nameRole} de <br />
              <a
                className="StyledLink"
                href={"/subsistema/" + member?.idSubsystem}
              >
                {member?.nameSubsystem}
              </a>
            </h3>
            <a className="MemberInfoLink StyledLink" href="/avaliacoes">
              Avalie os membros!
            </a>
          </div>
        </div>
        <div className="GradesBox">
          <h1 className="GradesTitle">Notas</h1>
          <div className="GradesContent">
            {grades.map((grade) =>
              grade.text ? (
                <></>
              ) : (
                <div className="ResultsCard">
                  <p className="ChartTitle">{grade.criteriaName}</p>
                  <p className="ChartText">Média: {grade.average.toFixed(1)}</p>
                  <BarChart
                    grades={grade.grades}
                    backgroundColor={grade.backgroundColor}
                    labels={grade.evaluators}
                  />
                </div>
              )
            )}
          </div>
          <h1 className="GradesTitle">Feedbacks</h1>
          <div className="GradesContent">
            {grades.map((grade) =>
              grade.text ? (
                <div className="ResultsCard">
                  <p className="ChartTitle">{grade.criteriaName}</p>
                  <ShowFeedback
                    texts={grade.grades}
                    evaluators={grade.evaluators}
                  />
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
        <div className="FriendsBox">
          <h1 className="GradesTitle">Colegas</h1>
          <div className="FriendsContent">
            {colleagues.map((colleague) => (
              <div className="FriendsCard">
                <a
                  className="FriendsName StyledLink"
                  href={"/membro/" + colleague.userId}
                >
                  {colleague.name}
                </a>
                <p>{colleague.nameRole}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
