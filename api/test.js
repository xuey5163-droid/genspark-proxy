import fs from "fs";

export default async function handler(req, res) {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(
        "/var/task/node_modules/@genspark/cli/package.json",
        "utf8"
      )
    );

    return res.status(200).json({
      success: true,
      package: {
        name: pkg.name,
        version: pkg.version,
        bin: pkg.bin || null,
        main: pkg.main || null,
        module: pkg.module || null,
        exports: pkg.exports || null
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
