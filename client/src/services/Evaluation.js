import axios from "axios";

export class EvaluationService {
  static URL = "https://360backend2023.vercel.app/api";

  static insertEvaluation(evaluatorId, evaluatedId, inputs, visible) {
    let evaluationsURL = `${this.URL}/grade/insertGrades`;
    return axios.post(evaluationsURL, {
      evaluatorId: evaluatorId,
      evaluatedId: evaluatedId,
      inputs: inputs,
      visible: visible,
    });
  }

  static fetchMember(id, user) {
    let memberURL = `${this.URL}/member/getMemberEvaluation`;
    return axios.post(memberURL, {
      id: id,
      user: user,
    });
  }

  static fetchMessage(id, role, user) {
    let messageURL = `${this.URL}/grade/getMsg`;
    return axios.post(messageURL, {
      id: id,
      role: role,
      user: user,
    });
  }

  static fetchQuestions(id, role, user) {
    let questionsURL = `${this.URL}/grade/getQuestions`;
    return axios.post(questionsURL, {
      id: id,
      role: role,
      user: user,
    });
  }

  static fetchEvaluatees(user) {
    let evaluateesURL = `${this.URL}/grade/getEvaluated`;
    return axios.post(evaluateesURL, {
      user: user.id,
      role: user.role,
      subsystem: user.subsystem,
      system: user.system,
    });
  }
}
