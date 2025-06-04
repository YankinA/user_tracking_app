import Koa from "koa";
import bodyParser from "koa-bodyparser";
import db from "./db";
import { trackerRouter } from "./tracker-router";
import cors from "@koa/cors";

const run = async () => {
  await db.connect();

  const traskerApp = new Koa();
  traskerApp.use(bodyParser());

  // Middleware для CORS
  traskerApp.use(
    cors({
      origin: "*",
    }),
  );

  traskerApp.use(trackerRouter.routes());
  traskerApp.use(trackerRouter.allowedMethods());

  traskerApp.listen(process.env.TRACKER_PORT, () => {
    console.log(
      `Tracker server is running on port ${process.env.TRACKER_PORT}`,
    );
  });
};

export default { run };
