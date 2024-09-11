import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { PORT } from "./helpers/env";
import { AppDataSource } from "./data-source";

import router from "./routes/api";
import {
  errorNotFoundMiddleware,
  errorServerMiddleware,
} from "./middlewares/error.middleware";

import docs from "./docs/route";

async function init() {
  try {
    await AppDataSource.initialize();

    const app = express();

    // limiter
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: "draft-7",
        legacyHeaders: false,
      })
    );
    app.use(morgan("combined"));
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: "*",
      })
    );

    app.use("/api/v1", router);
    docs(app);

    app.use(errorNotFoundMiddleware);
    app.use(errorServerMiddleware);

    app.listen(3000, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
