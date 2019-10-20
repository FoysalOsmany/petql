// @ts-ignore
const Db = require("tingodb")().Db;
import path from "path";

const dbPath = process.env.NODE_ENV === 'test'
  ? path.resolve(path.join(__dirname, "../../mockdata"))
  : path.resolve(path.join(__dirname, "../../data"));

// @ts-ignore
const db = new Db(dbPath, {});

export {db};
