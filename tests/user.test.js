const request = require("supertest");
const app = require("../index.js");

const objectToTest = {
  id: 3232312,
  name: "Armando",
  lastname: "Barrera",
  email: "armandobarrera@gmail.com",
  password: "password",
};

let token;
let userId;

describe("GET /", () => {
  it("responds with status 200", async () => {
    // Simular la solicitud HTTP
    const response = await request(app).get("/test");
    // Definir los valores esperados */
    expect(response.status).toBe(200);
  });
  it("responds with test Hello world", async () => {
    const response = await request(app).get("/test");
    expect(response.text).toBe("Hello World");
  });
});

describe("POST /user", () => {
  it("create a new user in the DB and response with the data", async () => {
    const response = await request(app).post("/user").send(objectToTest);
    userId = response.body.user._id;

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user.name).toBe(objectToTest.name);
    expect(response.body.user.lastname).toBe(objectToTest.lastname);
    expect(response.body.user.email).toBe(objectToTest.email);
  });
});

describe("GET /user/:id", () => {
  it("responds with an Object that contains an specific user", async () => {
    const response = await request(app).get(`/user/${userId}`);
    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);
    expect(response.body.name).toBe(objectToTest.name);
    expect(response.body.lastname).toBe(objectToTest.lastname);
    expect(response.body.email).toBe(objectToTest.email);
  });
});

describe("POST /login", () => {
  it("Success login with email and password", async () => {
    const response = await request(app).post("/login").send(objectToTest);
    token = response.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.status).toBe("success");
  });

  it("Error login with email and password", async () => {
    const user = {
      email: "test@correo.com",
      password: "test",
    };

    const response = await request(app).post("/login").send(user);

    expect(response.statusCode).toBe(401);
    expect(response.body).not.toHaveProperty("token");
    expect(response.body.status).toBe("error");
  });
});

describe("POST /delete", () => {
  it("Success delete with _id", async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});
