import { handleUpload } from "@vercel/blob/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: "BLOB_READ_WRITE_TOKEN belum dipasang. Buat Blob Store di Vercel Storage." });
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: [
          "image/*",
          "application/pdf",
          "text/*",
          "application/json",
          "application/zip",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ],
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ purpose: "green-ai-attachment" })
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload completed:", blob.pathname);
      }
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Blob upload error:", error);
    return res.status(400).json({ error: error.message || "Upload gagal." });
  }
}

