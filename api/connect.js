import mysql from "mysql";

export const db = mysql.createConnection({
  user: "admin",
  host: "db360.ctnkzp1grgfv.sa-east-1.rds.amazonaws.com",
  password: "caio1234",
  database: "360v3",
});
