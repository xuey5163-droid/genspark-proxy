import { readFileSync } from "node:fs";

export default function handler(req, res) {
  try {
    const packageJson = JSON.parse(
      readFileSync(
        "/var/task/node_modules/@genspark/cli/package.json",
        "utf8"
      )
    );

    return res.status(200).json({
      success: true,
      name: packageJson.name,
      version: packageJson.version,
      type: packageJson.type,
      main: packageJson.main,
      bin: packageJson.bin,
      exports: packageJson.exports
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
