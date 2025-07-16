import express from "express";
import { join } from "path";
import { readFileSync } from "fs";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import connectDB from "./db/connection.js";
import { configDotenv } from "dotenv";
import { timerRouter } from "./routes/index.js";

configDotenv();
const app = express();
connectDB();

app.use(express.json());

// Shopify Auth + Session Check
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(shopify.config.auth.callbackPath, shopify.auth.callback(), shopify.redirectToShopifyOrAppRoot());
app.post(shopify.config.webhooks.path, shopify.processWebhooks({ webhookHandlers: {} }));

app.use("/api/*", shopify.validateAuthenticatedSession());
app.use("/api/timer", timerRouter);

// Serve React Frontend
const STATIC_PATH = process.env.NODE_ENV === "production"
  ? `${process.cwd()}/frontend/dist`
  : `${process.cwd()}/frontend/`;

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), (req, res) => {
  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "3000", 10);
app.listen(PORT);
