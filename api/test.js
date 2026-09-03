export default async function handler(req, res) {
  try {
    const genspark = await import("@genspark/cli");

    return res.status(200).json({
      success: true,
      module_type: typeof genspark,
      exports: Object.keys(genspark),
      collectDesignAttachmentArgs: typeof genspark.collectDesignAttachmentArgs,
      function_source:
        typeof genspark.collectDesignAttachmentArgs === "function"
          ? genspark.collectDesignAttachmentArgs.toString().substring(0, 3000)
          : null
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
