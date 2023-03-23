import { db } from "../connect.js";

export const getSubsystems = (req, res) => {
  const q = "SELECT * FROM subsystems";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    res.send(data);
  });
};

export const getSubsystem = (req, res) => {
  const { id, user } = req.body;
  const q =
    "SELECT nameSubsystem, idSystem, nameSystem FROM subsystems " +
    "INNER JOIN systems ON subsystems.systemId=systems.idSystem " +
    "WHERE idSubsystem=?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Nenhum subsistema encontrado.");
    res.send(data);
  });
};

export const getSubsystemBySystem = (req, res) => {
  const q = "SELECT * FROM subsystems WHERE systemID=? ORDER BY nameSubsystem";

  db.query(q, [req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Nenhum subsistema encontrado.");
    res.send(data);
  });
};
