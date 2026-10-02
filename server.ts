/**
 * MINDSET Psychotherapy & Counseling Center
 * Application Server with Server-Side Tracking & Vite Integration
 */

import express from "express";
import path from "node:path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { handleTrackingApiRequest, getTrackingStatus } from "./server/tracking/index";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // -------------------------------------------------------------
  // API Routes (Always declared before Vite middleware)
  // -------------------------------------------------------------

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "MINDSET Psychotherapy Center" });
  });

  // Server-Side Tracking Endpoints (Background only, no public UI)
  app.post("/api/tracking/event", handleTrackingApiRequest);
  app.get("/api/tracking/status", getTrackingStatus);

  // Serve static public assets (images, logo, etc.) explicitly
  const publicDir = path.join(process.cwd(), "public");
  app.use("/images", express.static(path.join(publicDir, "images")));
  app.use(express.static(publicDir));

  // -------------------------------------------------------------
  // Vite Middleware (Development) / Static Bundle (Production)
  // -------------------------------------------------------------
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
    console.log(`MINDSET Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start MINDSET server:", err);
  process.exit(1);
});
