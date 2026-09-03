export default async function handler(req, res) {
  try {
    const genspark = await import("@genspark/cli");

    return res.status(200).json({
      success: true,
      message: "Genspark CLI package was successfully imported.",
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
