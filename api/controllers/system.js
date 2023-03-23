import { db } from "../connect.js";

export const getSystems = (req, res) => {
  const q = "SELECT * FROM systems";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    res.send(data);
  });
};

export const getSystem = (req, res) => {
  const q = "SELECT * FROM systems WHERE idSystem=?";

  db.query(q, [req.body.system], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Nenhum sistema encontrado!");
    res.send(data);
  });
};
