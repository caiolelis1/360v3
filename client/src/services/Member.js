import axios from "axios";

export class MemberService {
  static URL = "https://360backend2023.vercel.app/api";

  static fetchMember(id, user) {
    let memberURL = `${this.URL}/member/getMemberPage`;
    return axios.post(memberURL, {
      id: id,
      user: user,
    });
  }
  static fetchColleagues(id, subsystem) {
    let colleagueURL = `${this.URL}/member/getColleagues`;
    return axios.post(colleagueURL, {
      id: id,
      subsystem: subsystem,
    });
  }
  static fetchGrades(id, user) {
    let gradesURL = `${this.URL}/grade/getMemberGrades`;
    return axios.post(gradesURL, {
      id: id,
      user: user,
    });
  }
}
