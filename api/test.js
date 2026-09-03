import fs from "fs";

export default async function handler(req, res) {
  try {
    const file = "/var/task/node_modules/@genspark/cli/dist/index.js";

    const content = fs.readFileSync(file, "utf8");

    return res.status(200).json({
      success: true,
      file_size: content.length,
      first_3000_chars: content.substring(0, 3000)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
