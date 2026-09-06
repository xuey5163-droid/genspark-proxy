import { execFile } from "node:child_process";

const cli = "/var/task/node_modules/@genspark/cli/dist/index.js";

export default function handler(req, res) {

  const args = [
    cli,
    "task",
    "create",
    "custom_super_agent",

    "--agent_config_id",
    "9b12448e-9e66-4a1a-a3a4-2bccd427dbf0",

    "--task_name",
    "CLI Connection Test",

    "--query",
    "Please reply with exactly: CUSTOM_AGENT_TEST_OK",

    "--wait",
    "true"
  ];

  execFile(
    process.execPath,
    args,
    {
      timeout: 180000,
      maxBuffer: 10 * 1024 * 1024
    },
    (error, stdout, stderr) => {

      return res.status(200).json({
        success: !error,
        error: error ? error.message : null,
        code: error ? error.code : null,
        stdout: stdout || "",
        stderr: stderr || ""
      });

    }
  );
}
