import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

export default function handler(req, res) {
  const candidates = [
    resolve(process.cwd(), "node_modules/.bin/gsk"),
    resolve("/var/task/node_modules/.bin/gsk"),
  ];

  const results = candidates.map(path => ({
    path,
    exists: existsSync(path)
  }));

  const existing = candidates.find(path => existsSync(path));

  if (!existing) {
    return res.status(200).json({
      success: false,
      message: "gsk executable not found",
      cwd: process.cwd(),
      candidates: results
    });
  }

  execFile(existing, ["--version"], (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "gsk executable found but failed to execute",
        path: existing,
        error: error.message,
        code: error.code,
        stdout: stdout || "",
        stderr: stderr || ""
      });
    }

    return res.status(200).json({
      success: true,
      message: "gsk executed successfully",
      path: existing,
      version: stdout.trim(),
      stderr: stderr || ""
    });
  });
}
