import { existsSync, lstatSync, readlinkSync, readFileSync } from "node:fs";

const gsk = "/var/task/node_modules/.bin/gsk";

export default function handler(req, res) {
  const result = {
    path: gsk,
    exists: existsSync(gsk)
  };

  try {
    result.lstat = lstatSync(gsk);
  } catch (e) {
    result.lstat_error = e.message;
  }

  try {
    result.readlink = readlinkSync(gsk);
  } catch (e) {
    result.readlink_error = e.message;
  }

  try {
    result.content = readFileSync(gsk, "utf8");
  } catch (e) {
    result.read_error = e.message;
  }

  return res.status(200).json(result);
}
