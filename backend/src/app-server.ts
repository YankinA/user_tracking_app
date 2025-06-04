import Koa from "koa";
import { appRouter } from "./app-router";

const run = () => {
  const app = new Koa();
  app.use(appRouter.routes());
  app.use(appRouter.allowedMethods());

  app.listen(process.env.APP_PORT, () => {
    console.log(`App server is running on port ${process.env.APP_PORT}`);
  });
};

export default { run };
