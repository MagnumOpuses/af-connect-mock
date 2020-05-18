describe("dataset", () => {
  test("", async done => {
    const dataset = require("../app/src/dataset-mock");
    expect(dataset).toBeDefined();
    expect(dataset.length > 0).toBe(true);
    done();
  });
});
