import { db } from "../connect.js";

export const getMemberPage = (req, res) => {
  const { user, id } = req.body;

  //  if (user.roleId === 4 && id != user.idUser && user.subsystemId != 4)
  //  return res.status(403).json("Você não tem acesso a esta página!");

  const q1 =
    "SELECT idUser, name, idRole, nameRole, idSystem, nameSystem, idSubsystem, nameSubsystem " +
    "FROM duties " +
    "INNER JOIN users ON duties.userId=users.idUser " +
    "INNER JOIN roles ON duties.roleId=roles.idRole " +
    "INNER JOIN systems ON duties.systemId=systems.idSystem " +
    "INNER JOIN subsystems ON duties.subsystemId=subsystems.idSubsystem " +
    "WHERE userId=?;";

  db.query(q1, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Nenhum membro encontrado.");
    if (user.id == id) return res.send(data); //se vc é vc pode ver sua pagina
    if (user.subsystem === 4 && data[0].idSubsystem != 4)
      //se vc é do gp pode ver tudo menos gp
      return res.send(data);
    if (
      user.role === 4 &&
      user.id != data[0].idUser &&
      !(data[0].idRole === 3 && user.subsystem === data[0].idSubsystem) &&
      !(data[0].idRole === 1)
    )
      return res.status(403).json("Você não tem acesso a esta página!");
    if (
      user.role === 3 &&
      user.subsystem != data[0].idSubsystem &&
      !(data[0].idRole === 2 && user.system === data[0].idSystem) &&
      !(data[0].idRole === 1)
    )
      return res.status(403).json("Você não tem acesso a esta página!");
    if (
      user.role === 2 &&
      !(data[0].idRole === 3 && user.system === data[0].idSystem) &&
      !(data[0].idRole === 1) &&
      !(data[0].idRole === 4 && data[0].idSubsystem === 4)
    )
      return res.status(403).json("Você não tem acesso a esta página!");
    if (user.role === 1 && data[0].idRole === 4 && data[0].idSubsystem != 4)
      return res.status(403).json("Você não tem acesso a esta página!");
    res.send(data);
  });
};

export const getMemberEvaluation = (req, res) => {
  const { user, id } = req.body;

  const q1 =
    "SELECT idUser, name, idRole, nameRole, idSystem, nameSystem, idSubsystem, nameSubsystem " +
    "FROM duties " +
    "INNER JOIN users ON duties.userId=users.idUser " +
    "INNER JOIN roles ON duties.roleId=roles.idRole " +
    "INNER JOIN systems ON duties.systemId=systems.idSystem " +
    "INNER JOIN subsystems ON duties.subsystemId=subsystems.idSubsystem " +
    "WHERE userId=?;";

  db.query(q1, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Nenhum membro encontrado.");
    if (user.roleId === 1 && data[0].idRole === 4)
      return res.status(403).json("Você não deve avaliar este(a) membro(a)!");
    if (
      user.roleId === 2 &&
      (data[0].idRole === 4 ||
        (data[0].idRole === 3 && user.systemId != data[0].idSystem))
    )
      return res.status(403).json("Você não deve avaliar este(a) membro(a)!");
    if (
      user.roleId === 3 &&
      ((data[0].idRole === 4 && user.subsystemId != data[0].idSubsystem) ||
        (data[0].idRole === 2 && user.systemId != data[0].idSystem))
    )
      return res.status(403).json("Você não deve avaliar este(a) membro(a)!");
    if (
      user.roleId === 4 &&
      user.subsystemId != data[0].idSubsystem &&
      user.subsystemId != 4 &&
      data[0].idRole === 1
    )
      return res.status(403).json("Você não deve avaliar este(a) membro(a)!");
    res.send(data);
  });
};

export const getColleagues = (req, res) => {
  const q =
    "SELECT userId, name, nameRole " +
    "FROM duties " +
    "INNER JOIN users ON duties.userId=users.idUser " +
    "INNER JOIN roles ON duties.roleId=roles.idRole " +
    "WHERE subsystemId=? AND userId!=? " +
    "ORDER BY idRole, name";
  db.query(q, [req.body.subsystem, req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.send(data);
  });
};

export const getMemberBySubsystem = (req, res) => {
  const q =
    "SELECT userId, name, nameRole " +
    "FROM duties " +
    "INNER JOIN users ON duties.userId=users.idUser " +
    "INNER JOIN roles ON duties.roleId=roles.idRole " +
    "WHERE subsystemId=? " +
    "ORDER BY idRole, name";

  db.query(q, [req.body.subsystem], (err, data) => {
    if (err) return res.status(500).json(err);
    res.send(data);
  });
};
