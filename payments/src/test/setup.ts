import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let mongo: MongoMemoryServer;

jest.mock("@mroc/ex-ms-common", () => ({
  ...jest.requireActual("@mroc/ex-ms-common"),
  natsWrapper: {
    connect: jest.fn().mockResolvedValue(undefined),
    client: jest.fn().mockReturnValue({
      publish: jest
        .fn()
        .mockImplementation(
          (subject: string, data: string, callback: () => void) => {
            callback();
          }
        ),
    }),
  },
}));

beforeAll(async () => {
  process.env.JWT_KEY = "Abcd1234!";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

declare global {
  var signin: () => string[];
}

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
