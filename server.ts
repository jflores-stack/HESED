import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  app.post("/api/scan-form", async (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Missing image" });
      }

      // Initialize Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      // Remove the prefix (e.g., data:image/jpeg;base64,)
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const prompt = `
Extract the information from this handwritten or filled form into a clean JSON object. 
The form is an enrollment form for 'Proyecto Hesed'.
Respond ONLY with a valid JSON object following this exact schema:
{
  "kidName": "string",
  "birthDate": "string",
  "age": "string",
  "gender": "string (M or F)",
  "address": "string",
  "school": "string",
  "grade": "string",
  "shift": "string (Mañana or Tarde)",
  "hasDisease": "boolean",
  "diseaseDetails": "string",
  "hasAllergies": "boolean",
  "allergyDetails": "string",
  "medications": "string",
  "fatherName": "string",
  "fatherPhone": "string",
  "motherName": "string",
  "motherPhone": "string",
  "guardianName": "string",
  "guardianId": "string",
  "guardianRelation": "string",
  "guardianWorks": "boolean",
  "guardianPhone": "string",
  "guardianAddress": "string"
}
If a field is empty or illegible, make it an empty string "" or false for booleans.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: "image/jpeg",
            },
          },
        ],
      });

      const textRes = response.text || "";
      // Parse JSON from text response
      const jsonStart = textRes.indexOf("{");
      const jsonEnd = textRes.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonStr = textRes.substring(jsonStart, jsonEnd + 1);
        const parsedData = JSON.parse(jsonStr);
        return res.json(parsedData);
      } else {
        throw new Error("Could not parse JSON from Gemini response");
      }
    } catch (error) {
      console.error("OCR Error:", error);
      res.status(500).json({ error: "Failed to scan image" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
  });
}

startServer();
