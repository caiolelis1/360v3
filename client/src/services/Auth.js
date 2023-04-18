import axios from "axios";

export class AuthService {
  static URL = "https://360backend2023.vercel.app/api";

  static fetchSystems() {
    let systemsURL = `${this.URL}/system/getSystems`;
    return axios.post(systemsURL);
  }

  static fetchSubsystems(id) {
    let subsystemsURL = `${this.URL}/subsystem/getSubsystemBySystem`;
    return axios.post(subsystemsURL, {
      id: id,
    });
  }
}
