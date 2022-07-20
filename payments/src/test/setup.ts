import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51JdASsJI5NZqbfdlZ7WIA1VoJgIQiaYDMFlVpN9O9BtE5cj10xZdXpKM07KsVZ94ewmsCecrTqtnSyMK5IDvVtQ000lx7gUsoQ';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'afsdgfsf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collcetion of collections) {
    await collcetion.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) {
    await mongo.stop();
  }
});

global.signin = (id?: string) => {
  // Build a JWT payload {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session {jwt: MY_JWT}
  const session = {
    jwt: token
  };

  // Turn into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base 64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return cookie string
  return [`session=${base64}`];
};
