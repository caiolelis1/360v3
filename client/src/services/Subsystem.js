import axios from "axios";

export class SubsystemService {
  static URL = "https://360backend2023.vercel.app/api";

  static fetchSubsystem(id, user) {
    let subsystemURL = `${this.URL}/subsystem/getSubsystem`;
    return axios.post(subsystemURL, {
      id: id,
      user: user,
    });
  }

  static fetchMembers(id) {
    let membersURL = `${this.URL}/member/getMemberBySubsystem`;
    return axios.post(membersURL, {
      subsystem: id,
    });
  }

  static fetchGrades(id, user) {
    let gradesURL = `${this.URL}/grade/getSubsystemGrades`;
    return axios.post(gradesURL, {
      subsystem: id,
      user: user,
    });
  }
}
