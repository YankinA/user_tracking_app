import Router from "koa-router";
import { validateEvents } from "./middlewares/validate";
import fs from "fs";
import path from "path";
import { Context } from "koa";
import { Event } from "./models/Event";

export const trackerRouter = new Router();

trackerRouter.post("/track", async (ctx: Context) => {
  const events = validateEvents(ctx.request.body);
  const hasError = events.some((event) => event?.error);
  if (hasError) {
    ctx.status = 422;
    const details = events.map((event) => event?.error).filter(Boolean);
    ctx.body = { error: "Validation errors", details };
    return;
  }

  try {
    await Event.insertMany(
      events.map(({ value }) => ({
        event: value.event,
        tags: value.tags,
        url: value.url,
        title: value.title,
        ts: value.ts,
      })),
    );
  } catch (error) {
    console.error("Failed to save events:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }

  ctx.status = 200;
  ctx.body = { message: "Events saved" };
});

trackerRouter.get("/tracker", async (ctx: Context) => {
  const traskerPath = path.join(__dirname, "../public", "index.js");
  const jsContent = await fs.promises.readFile(traskerPath, "utf-8");

  ctx.type = "text/javascript";
  ctx.body = jsContent;
});
