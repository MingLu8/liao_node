import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
describe("Orders (e2e)", () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  it("/orders (POST) - Logged and Validated", () => {
    return request(app.getHttpServer()).post("/orders").send({ reference: "ABC", amount: 100 }).expect(201);
  });
  afterAll(async () => { await app.close(); });
});
