import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { AppDataSource } from "./data-source";
// import { User } from "./entity/User";

import router from "./routes/api";

const PORT = process.env.PORT || 3000;

async function init() {
  try {
    await AppDataSource.initialize();

    const app = express();

    app.use(morgan("combined"));
    app.use(bodyParser.json());

    app.use("/api/v1", router);

    app.listen(3000, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
