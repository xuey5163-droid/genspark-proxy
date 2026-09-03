import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export default async function handler(req, res) {
  try {
    // Check that the Genspark API key exists
    if (!process.env.GSK_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "GSK_API_KEY is not configured in Vercel."
      });
    }

    // Test the Genspark CLI
    const { stdout, stderr } = await execFileAsync(
      "gsk",
      ["--version"],
      {
        env: {
          ...process.env,
          GSK_API_KEY: process.env.GSK_API_KEY
        }
      }
    );

    return res.status(200).json({
      success: true,
      message: "Genspark CLI is available.",
      version: stdout.trim(),
      stderr: stderr.trim()
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stdout: error.stdout || "",
      stderr: error.stderr || ""
    });
  }
}
