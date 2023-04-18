import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import util from "util";

export const register = (req, res) => {
  var id;

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Usuário já existe!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const query = util.promisify(db.query).bind(db);
    const q2 = "INSERT INTO duties (userId ,systemId, subSystemId) VALUE (?)";

    let values2;

    (async () => {
      try {
        await query(
          "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES ('" +
            req.body.username +
            "','" +
            req.body.email +
            "','" +
            hashedPassword +
            "','" +
            req.body.name +
            "')"
        );
      } finally {
        (async () => {
          try {
            const teste = await query(
              "SELECT idUser FROM users WHERE username='" +
                req.body.username +
                "'"
            );
            id = teste[0].idUser;
            values2 = [id, req.body.system, req.body.subsystem];
          } finally {
            db.query(q2, [values2], (err) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("Usuário criado!");
            });
          }
        })();
      }
    })();
  });
};

export const login = (req, res) => {
  const q =
    "SELECT * FROM users INNER JOIN duties ON users.idUser=duties.userId WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Usuário não encontrado!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Combinação errada de usuário e senha!");

    const token = jwt.sign(
      {
        id: data[0].userId,
        role: data[0].roleId,
        system: data[0].systemId,
        subsystem: data[0].subsystemId,
      },
      "secretkey"
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        domain: ".vercel.app",
      })
      .status(200)
      .json(token);
  });
};
