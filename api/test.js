import { execFile } from "child_process";

export default async function handler(req, res) {
  try {
    const result = await new Promise((resolve, reject) => {
      execFile(
        process.execPath,
        [
          "/var/task/node_modules/@genspark/cli/dist/index.js",
          "--version"
        ],
        {
          env: process.env,
          timeout: 10000
        },
        (error, stdout, stderr) => {
          if (error) {
            reject({
              message: error.message,
              code: error.code,
              stdout,
              stderr
            });
          } else {
            resolve({
              stdout,
              stderr
            });
          }
        }
      );
    });

    return res.status(200).json({
      success: true,
      result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    });
  }
}
