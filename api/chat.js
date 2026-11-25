export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.NOTRACK_KEY;
  if (!key) return res.status(503).json({ error: "NOTRACK_KEY belum diatur di Vercel Environment Variables." });

  try {
    const messages = req.body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Pesan tidak valid." });
    }

    const upstream = await fetch("https://api.notrack.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "notrack-uncensored",
        messages: messages.slice(-24),
        stream: false,
        max_tokens: 1800,
        temperature: 0.75
      })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.error?.message || "Permintaan ke API NoTrack gagal."
      });
    }

    return res.status(200).json({
      reply: data?.choices?.[0]?.message?.content || "Tidak ada jawaban dari model."
    });
  } catch (error) {
    console.error("NoTrack API error:", error);
    return res.status(500).json({ error: "Server gagal menghubungi API AI." });
  }
        }

