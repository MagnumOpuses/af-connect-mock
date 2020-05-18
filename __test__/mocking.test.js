describe("mock services", () => {
  test("auth successful", async done => {
    const auth = require("../app/src/auth");
    const result = await auth.login("nina_g", "Abcd1234");
    expect(result).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.message).toBeDefined();
    done();
  });

  test("auth unsuccessful", async done => {
    const auth = require("../app/src/auth");
    const result = await auth.login("incorrect-user", "incorrect-password");
    expect(result).toBeDefined();
    expect(result.status).toBe(401);
    expect(result.message).toBeDefined();
    expect(result.message).toBe("Invalid login");
    done();
  });
});
