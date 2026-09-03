import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const paths = [
      "/var/task/node_modules/.bin/gsk",
      "/var/task/node_modules/@genspark/cli",
      "/var/task/node_modules/@genspark/cli/package.json"
    ];

    const result = {};

    for (const p of paths) {
      result[p] = {
        exists: fs.existsSync(p),
        isDirectory: fs.existsSync(p) && fs.statSync(p).isDirectory()
      };
    }

    let packageInfo = null;

    const packagePath = "/var/task/node_modules/@genspark/cli/package.json";

    if (fs.existsSync(packagePath)) {
      packageInfo = JSON.parse(
        fs.readFileSync(packagePath, "utf8")
      );
    }

    return res.status(200).json({
      success: true,
      paths: result,
      package: packageInfo
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
