import { existsSync, readdirSync } from "node:fs";

export default function handler(req, res) {
  const paths = [
    "/var/task/node_modules",
    "/var/task/node_modules/@genspark",
    "/var/task/node_modules/@genspark/cli",
    "/var/task/node_modules/@genspark/cli/dist"
  ];

  const result = {};

  for (const path of paths) {
    try {
      result[path] = {
        exists: existsSync(path),
        files: existsSync(path) ? readdirSync(path) : []
      };
    } catch (e) {
      result[path] = {
        error: e.message
      };
    }
  }

  return res.status(200).json(result);
}
