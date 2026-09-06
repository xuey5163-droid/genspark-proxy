import { execFile } from "node:child_process";

export default function handler(req, res) {
  execFile("gsk", ["--version"], (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
        code: error.code,
        stdout: stdout || "",
        stderr: stderr || ""
      });
    }

    return res.status(200).json({
      success: true,
      version: stdout.trim(),
      stderr: stderr || ""
    });
  });
}
