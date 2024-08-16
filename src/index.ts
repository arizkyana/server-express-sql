import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import { PORT } from "./helpers/env";
import { AppDataSource } from "./data-source";

import router from "./routes/api";

async function init() {
  try {
    await AppDataSource.initialize();

    const app = express();

    app.use(morgan("combined"));
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: "*",
      })
    );

    app.use("/api/v1", router);

    app.listen(3000, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
