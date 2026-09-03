import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const result = {};

    // 1. Check Vercel's deployed package.json
    const packagePath = "/var/task/package.json";

    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(
        fs.readFileSync(packagePath, "utf8")
      );

      result.package_json = {
        exists: true,
        name: packageJson.name,
        version: packageJson.version,
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {}
      };
    } else {
      result.package_json = {
        exists: false
      };
    }

    // 2. Check node_modules
    const nodeModulesPath = "/var/task/node_modules";

    result.node_modules = {
      exists: fs.existsSync(nodeModulesPath),
      packages: []
    };

    if (fs.existsSync(nodeModulesPath)) {
      result.node_modules.packages = fs
        .readdirSync(nodeModulesPath)
        .filter(name => !name.startsWith("."))
        .slice(0, 100);
    }

    // 3. Specifically check @genspark
    const gensparkPath = "/var/task/node_modules/@genspark";

    result.genspark = {
      directory_exists: fs.existsSync(gensparkPath),
      contents: []
    };

    if (fs.existsSync(gensparkPath)) {
      result.genspark.contents = fs.readdirSync(gensparkPath);
    }

    // 4. Check the expected CLI executable
    const gskPath = "/var/task/node_modules/.bin/gsk";

    result.gsk_executable = {
      exists: fs.existsSync(gskPath),
      path: gskPath
    };

    // 5. Check environment variables without exposing the API key
    result.environment = {
      GSK_API_KEY_exists: !!process.env.GSK_API_KEY,
      GSK_BASE_URL: process.env.GSK_BASE_URL || null,
      GSK_PROJECT_ID_exists: !!process.env.GSK_PROJECT_ID,
      NODE_VERSION: process.version
    };

    return res.status(200).json({
      success: true,
      result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
