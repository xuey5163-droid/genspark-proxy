import { execFile } from "node:child_process";

const cli = "/var/task/node_modules/@genspark/cli/dist/index.js";

export default function handler(req, res) {
  execFile(
    process.execPath,
    [cli, "--version"],
    {
      timeout: 30000
    },
    (error, stdout, stderr) => {
      return res.status(200).json({
        success: !error,
        node: process.execPath,
        cli,
        error: error ? error.message : null,
        code: error ? error.code : null,
        stdout: stdout || "",
        stderr: stderr || ""
      });
    }
  );
}
