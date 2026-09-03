import { createRequire } from "module";

export default async function handler(req, res) {
  try {
    const require = createRequire(import.meta.url);

    const resolved = require.resolve("@genspark/cli");

    const genspark = await import("@genspark/cli");

    return res.status(200).json({
      success: true,
      resolved_path: resolved,
      exports: Object.keys(genspark)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
