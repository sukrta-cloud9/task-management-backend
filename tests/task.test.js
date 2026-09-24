const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
  test("GET /tasks should require authentication", async () => {
    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(401);
  });
});