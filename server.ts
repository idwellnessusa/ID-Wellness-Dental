import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/subscribe", (req, res) => {
    const { email, language } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const subscribersPath = path.join(__dirname, "src/data/subscribers.json");
    
    try {
      let subscribers = [];
      if (fs.existsSync(subscribersPath)) {
        const fileContent = fs.readFileSync(subscribersPath, "utf8");
        subscribers = JSON.parse(fileContent || "[]");
      }

      // Check for duplicates
      if (subscribers.some((s: any) => s.email === email)) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const newSubscriber = {
        email,
        date: new Date().toISOString().split("T")[0],
        language: language || "en",
        status: "active"
      };

      subscribers.push(newSubscriber);
      fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error saving subscriber:", error);
      res.status(500).json({ error: "Internal server error" });
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
