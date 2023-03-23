import { db } from "../connect.js";

export const getQuestions = (req, res) => {
  const { id, user, role } = req.body;

  let typeCriteria;

  let q =
    "SELECT idquestion, question, type, text " +
    "FROM questions " +
    "INNER JOIN criterias ON questions.criteriaId=criterias.idCriteria " +
    "WHERE type = 1 OR type = ?";

  if (id == user.id) {
    q += " OR idquestion=26 ORDER BY text, type;";
  } else if (parseInt(user.role) < parseInt(role)) {
    q += " OR idquestion=27 ORDER BY text, type;";
  } else {
    q += " ORDER BY text, type;";
  }

  if (role === 4) {
    typeCriteria = 2;
  } else {
    typeCriteria = 3;
  }

  db.query(q, [typeCriteria], (err, data) => {
    if (err) return res.status(500).json(err);
    res.send(data);
  });
};

export const getMsg = (req, res) => {
  const { id, role, user } = req.body;
  let msg = "";
  if (user.role == 1) {
    msg =
      "Observação: suas respostas serão vistas pela Gestão de Pessoas e pelo avaliado.";
  } else if (user.role == 2) {
    if (role == 4 || role == 1) {
      msg = "Observação: esta avaliação será vista pela Gestão de Pessoas.";
    } else {
      msg =
        "Observação: esta avaliação será vista pela Gestão de Pessoas e pelo avaliado.";
    }
  } else if (user.role == 3) {
    if (role == 4) {
      msg =
        "Observação: esta avaliação será vista pela Gestão de Pessoas e pelo(a) avaliado(a).";
    } else {
      msg = "Observação: esta avaliação será vista pela Gestão de Pessoas.";
    }
  } else {
    if (role == 4) {
      if (user.subsystem == 4) {
        msg =
          "Observação: esta avaliação será vista pelo diretor do subsistema.";
      } else {
        msg =
          "Observação: esta avaliação será vista pela Gestão de Pessoas e pelo diretor do subsistema.";
      }
    } else {
      msg = "Observação: esta avaliação será vista pela Gestão de Pessoas.";
    }
  }
  res.send(msg);
};

export const getCriteria = (req, res) => {
  const q = "SELECT idCriteria, name FROM criterias WHERE type = 1 OR type = ?";

  let typeCriteria;

  if (req.body.role === 4) {
    typeCriteria = 2;
  } else {
    typeCriteria = 3;
  }

  db.query(q, [typeCriteria], (err, data) => {
    if (err) return res.status(500).json(err);
    res.send(data);
  });
};

export const getEvaluated = (req, res) => {
  const { user, role, system, subsystem } = req.body;

  let q =
    "SELECT name, userId, idRole, nameRole, idSystem, nameSystem, idSubsystem, nameSubsystem, CASE WHEN (SELECT COUNT(1) FROM grades WHERE evaluatorId=" +
    user +
    " AND evaluatedId=users.idUser) > 0 THEN 1 ELSE 0 END AS evaluated FROM duties INNER JOIN users ON duties.userId=users.idUser INNER JOIN roles ON duties.roleId=roles.idRole INNER JOIN systems ON duties.systemId=systems.idSystem INNER JOIN subsystems ON duties.subsystemId=subsystems.idSubsystem ";

  if (role === 1) {
    //capitao
    q += "WHERE (NOT roleId=4) OR (subsystemId=4) ORDER BY roleId, name;";
  } else if (role === 2 && system === 1) {
    //diretor geral de administração
    q +=
      "WHERE (roleId=1) OR (roleId=2) OR (roleId=3 AND duties.systemId=" +
      system +
      ") OR (roleId=4 AND (idSubsystem=1 OR idSubsystem=5 OR idSubsystem=6)) ORDER BY roleId, name;";
  } else if (role === 2) {
    //outros diretores gerais
    q +=
      "WHERE (roleId=1) OR (roleId=2) OR (roleId=3 AND duties.systemId=" +
      system +
      ") ORDER BY roleId, name;";
  } else if (role === 3) {
    //diretores
    q +=
      "WHERE (duties.subsystemId=" +
      subsystem +
      ") OR (roleId=2 AND duties.systemId=" +
      system +
      ") OR (roleId=1) ORDER BY roleId, name;";
  } else if (role === 4 && subsystem === 4) {
    //membros da GP
    q +=
      "WHERE duties.subsystemId=" +
      subsystem +
      " OR roleId=1 ORDER BY roleId, name;";
  } else {
    //membros comuns
    q += "WHERE duties.subsystemId=" + subsystem + " ORDER BY roleId, name;";
  }

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    res.send(data);
  });
};

export const insertGrades = (req, res) => {
  const questoes = Object.keys(req.body.inputs);
  const valores = Object.values(req.body.inputs);
  const { visible } = req.body;

  const q =
    "INSERT INTO grades (questionId, evaluatorId, evaluatedId, grade) VALUES(?,?,?,?);";
  const q2 =
    "INSERT INTO grades (questionId, evaluatorId, evaluatedId, grade, visible) VALUES(?,?,?,?, ?);";
  for (let i = 0; i < questoes.length; i++) {
    if ((questoes[i] == 24 || questoes[i] == 25) && visible) {
      db.query(
        q2,
        [
          parseInt(questoes[i]),
          req.body.evaluatorId,
          req.body.evaluatedId,
          valores[i],
          visible,
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
        }
      );
    } else {
      db.query(
        q,
        [
          parseInt(questoes[i]),
          req.body.evaluatorId,
          req.body.evaluatedId,
          valores[i],
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
        }
      );
    }
  }

  return res.status(200).json("Avaliado com sucesso!");
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function toFindDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
}

export const getMemberGrades = (req, res) => {
  let authorized = false;
  const { id, user } = req.body;
  if (id == user.id || user.subsystem === 4) authorized = true;

  const red = "rgba(255, 0, 0, 1)";
  const yellow = "rgba(255, 255, 0, 1)";
  const green = "rgba(0, 255, 0, 1)";
  let sum;
  const q =
    "SELECT criterias.name AS criteriaName, GROUP_CONCAT(grade) AS grades, GROUP_CONCAT(DISTINCT text) AS text, GROUP_CONCAT(users.name) AS evaluators, GROUP_CONCAT(visible) AS visible , GROUP_CONCAT(DISTINCT evaluated.roleId) AS roleEvaluated, GROUP_CONCAT(evaluator.roleId) AS roleEvaluator, GROUP_CONCAT(DISTINCT evaluated.subsystemId) AS subsystem, GROUP_CONCAT(DISTINCT evaluated.systemId) AS systemId, GROUP_CONCAT(evaluator.userId) AS idEvaluator " +
    "FROM grades " +
    "INNER JOIN questions ON questionId=idquestion " +
    "INNER JOIN criterias ON criteriaId=idCriteria " +
    "INNER JOIN duties evaluated ON evaluatedId=evaluated.userId " +
    "INNER JOIN duties evaluator ON evaluatorId=evaluator.userId " +
    "INNER JOIN users ON evaluatorId=users.idUser " +
    "WHERE evaluatedId=? " +
    "GROUP BY criteriaId;";
  db.query(q, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Nenhuma avaliação encontrada!");
    if (
      (user.role === 3 && user.subsystem == data[0].subsystem) ||
      (user.role === 2 &&
        ((user.systemId == data[0].systemId && data[0].role == 3) ||
          data[0].subsystem == 4)) ||
      (user.role === 1 &&
        (data[0].roleEvaluated == 2 || data[0].subsystem == 4))
    ) {
      authorized = true;
    }

    for (let i = 0; i < data.length; i++) {
      sum = 0;
      if (isNumber(data[i].grades[0]))
        data[i].grades = data[i].grades.split(",").map(Number);
      else data[i].grades = data[i].grades.split(",");

      data[i].backgroundColor = [];
      data[i].evaluators = data[i].evaluators.split(",");
      data[i].roleEvaluator = data[i].roleEvaluator.split(",").map(Number);
      data[i].idEvaluator = data[i].idEvaluator.split(",").map(Number);

      if (toFindDuplicates(data[i].idEvaluator).length != 0) {
        let auxGrades = [];
        let auxRoles = [];
        let auxIds = [];
        let auxEvaluators = [];
        for (let x = 0; x < data[i].grades.length; x += 2) {
          auxGrades.push((data[i].grades[x] + data[i].grades[x + 1]) / 2);
          auxRoles.push(data[i].roleEvaluator[x]);
          auxIds.push(data[i].idEvaluator[x]);
          auxEvaluators.push(data[i].evaluators[x]);
        }
        data[i].grades = auxGrades;
        data[i].roleEvaluator = auxRoles;
        data[i].idEvaluator = auxIds;
        data[i].evaluators = auxEvaluators;
      }

      if (data[i].visible) {
        data[i].visible = data[i].visible.split(",").map(Number);
      }

      for (let j = 0; j < data[i].grades.length; j++) {
        sum += data[i].grades[j];

        if (user.subsystem != 4)
          if (
            ((parseInt(data[0].roleEvaluated) <= data[i].roleEvaluator[j] &&
              id == user.id) ||
              (parseInt(data[0].roleEvaluated) === 4 &&
                data[i].roleEvaluator[j] === 2)) &&
            authorized &&
            data[i].evaluators[j] &&
            data[i].visible[j] != 1 &&
            !(id == user.id && user.id == data[i].idEvaluator[j])
          )
            data[i].evaluators[j] = "Anônimo";

        if (data[i].grades[j] < 3 && authorized) {
          data[i].backgroundColor.push(red);
        } else if (data[i].grades[j] === 3 && authorized) {
          data[i].backgroundColor.push(yellow);
        } else if (data[i].grades[j] > 3 && authorized) {
          data[i].backgroundColor.push(green);
        }
      }
      data[i].average = sum / data[i].grades.length;
      if (!authorized) {
        delete data[i].grades;
        delete data[i].evaluators;
      }
    }
    res.send(data);
  });
};

export const getSubsystemGrades = (req, res) => {
  let authorized = false;
  let gp = false;
  const { subsystem, user } = req.body;

  if (subsystem == user.subsystem) authorized = true;

  const red = "rgba(255, 0, 0, 1)";
  const yellow = "rgba(255, 255, 0, 1)";
  const green = "rgba(0, 255, 0, 1)";
  let sum;

  const q =
    "SELECT criterias.name AS criteriaName ,GROUP_CONCAT(grade) AS grades, GROUP_CONCAT(DISTINCT systemId) AS systemId " +
    "FROM grades " +
    "INNER JOIN questions ON questionId=idquestion " +
    "INNER JOIN criterias ON criteriaId=idCriteria " +
    "INNER JOIN duties ON evaluatedId=userId " +
    "WHERE subsystemId=? AND (type=1 OR type=2) AND (text IS NULL) " +
    "GROUP BY criteriaId;";

  db.query(q, subsystem, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Nenhuma avaliação encontrada!");
    if (user.role === 2 && user.system == data[0].systemId) authorized = true;
    if (!authorized) return res.status(403).json("Você não tem acesso!");
    for (let i = 0; i < data.length; i++) {
      sum = 0;
      data[i].grades = data[i].grades.split(",").map(Number);
      if (gp) {
        data[i].labels = ["1", "2", "3", "4", "5"];
        data[i].backgroundColor = [red, red, yellow, green, green];
        data[i].count = [0, 0, 0, 0, 0];
      }

      for (let j = 0; j < data[i].grades.length; j++) {
        if (gp) data[i].count[data[i].grades[j] - 1]++;
        sum += data[i].grades[j];
      }
      data[i].average = sum / data[i].grades.length;
      if (!gp) delete data[i].grades;
    }
    res.send(data);
  });
};
