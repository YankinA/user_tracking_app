import Router from "koa-router";

import fs from "fs";
import path from "path";
import { Context } from "koa";

export const appRouter = new Router();

const staticPath = path.join(__dirname, "../public");
appRouter.get(["/", /^\/(1|2|3)\.html$/], async (ctx: Context) => {
  const htmlPath = path.join(staticPath, "index.html");
  const htmlContent = await fs.promises.readFile(htmlPath, "utf-8");

  ctx.type = "html";
  ctx.body = htmlContent;
});
