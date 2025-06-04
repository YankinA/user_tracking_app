import trackerServer from "./tracker-server";
import appServer from "./app-server";
import dotenv from "dotenv";

dotenv.config();

trackerServer.run();

appServer.run();
