"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
describe("Orders (e2e)", () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
    });
    it("/orders (POST) - Logged and Validated", () => {
        return request(app.getHttpServer()).post("/orders").send({ reference: "ABC", amount: 100 }).expect(201);
    });
    afterAll(async () => { await app.close(); });
});
//# sourceMappingURL=order.e2e-spec.js.map