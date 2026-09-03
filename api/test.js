export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.genspark.ai/api/tool_cli/agent_ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.GSK_API_KEY
        },
        body: JSON.stringify({
          message: "Hello. Please reply with exactly: Genspark connection successful.",
          task_type: "super_agent"
        })
      }
    );

    const text = await response.text();

    return res.status(response.status).json({
      success: response.ok,
      genspark_status: response.status,
      response: text
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
