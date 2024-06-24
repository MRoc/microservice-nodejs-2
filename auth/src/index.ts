import { app } from "./app";
import { throwIfMissingMongoConfig, connectMongo } from "@mroc/ex-ms-common";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY not found");
    }

    throwIfMissingMongoConfig();
    connectMongo();

    app.listen(3000, () => {
      console.log("Auth service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
