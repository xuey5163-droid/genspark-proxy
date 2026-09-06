import { execFile } from "node:child_process";

const gsk = "/var/task/node_modules/.bin/gsk";

export default function handler(req, res) {
  execFile(gsk, ["--help"], {
    timeout: 30000
  }, (error, stdout, stderr) => {

    return res.status(200).json({
      success: !error,
      error: error ? error.message : null,
      code: error ? error.code : null,
      stdout: stdout || "",
      stderr: stderr || ""
    });

  });
}
