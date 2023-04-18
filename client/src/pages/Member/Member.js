import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { AuthContext } from "../../context/authContexts";
import ShowFeedback from "../../components/ShowFeedback";
import NavbarComponent from "../../components/Navbar";
import BarChart from "../../components/BarChart";
import profile from "../../assets/user.png";
import "../../css/styles.css";
import { MemberService } from "../../services/Member";

const Member = () => {
  const params = useParams();
  const id = params.id;

  const { accessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [member, setMember] = useState({});
  const [grades, setGrades] = useState([]);
  const [colleagues, setColleagues] = useState([]);
  const [ownPage, setOwnPage] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);

  useEffect(() => {
    setUser(jwt_decode(accessToken));
  }, []);

  useEffect(() => {
    if (user.id)
      MemberService.fetchMember(id, user)
        .then((res) => {
          if (res.data[0].idUser === user.id) setOwnPage(true);
          setMember(res.data[0]);
        })
        .catch(() => {
          navigate("/perfil");
        });
  }, [user]);

  useEffect(() => {
    if (member.idSubsystem) {
      MemberService.fetchColleagues(id, member.idSubsystem).then((res) => {
        setColleagues(res.data);
      });
      MemberService.fetchGrades(id, user).then((res) => {
        setGrades(res.data);
      });
    }
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
            {ownPage && (
              <a className="MemberInfoLink StyledLink" href="/avaliacoes">
                Avalie os membros!
              </a>
            )}
          </div>
        </div>
        <div className="GradesBox">
          <h1 className="GradesTitle">Notas</h1>
          <div className="GradesContent">
            {grades.map((grade) =>
              grade.text ? (
                grade.grades && isFeedback === false && setIsFeedback(true)
              ) : (
                <div className="ResultsCard">
                  <p className="ChartTitle">{grade.criteriaName}</p>
                  <p className="ChartText">Média: {grade.average.toFixed(1)}</p>
                  {grade.grades && (
                    <BarChart
                      grades={grade.grades}
                      backgroundColor={grade.backgroundColor}
                      labels={grade.evaluators}
                    />
                  )}
                </div>
              )
            )}
          </div>
          {isFeedback && (
            <div className="FeedbackChecker">
              <h1 className="GradesTitle">Feedbacks</h1>
              <div className="GradesContent">
                {grades.map((grade) =>
                  grade.text ? (
                    <div className="ResultsCard">
                      <p className="ChartTitle">{grade.criteriaName}</p>
                      <ShowFeedback grades={grade.grades} />
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          )}
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

export default Member;
