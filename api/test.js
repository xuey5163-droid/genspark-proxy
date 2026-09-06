import { readFileSync } from "node:fs";

export default function handler(req, res) {
  try {
    const pkg = JSON.parse(
      readFileSync(
        "/var/task/node_modules/@genspark/cli/package.json",
        "utf8"
      )
    );

    return res.status(200).json({
      name: pkg.name,
      version: pkg.version,
      dependencies: pkg.dependencies,
      optionalDependencies: pkg.optionalDependencies,
      peerDependencies: pkg.peerDependencies
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
