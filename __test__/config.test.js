describe("config", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.unmock("dotenv");
  });

  test("default values", async done => {
    jest.mock("dotenv", () => ({
      config: () => {
        delete process.env.HOST;
        delete process.env.PORT;
        delete process.env.SSL_PORT;
        delete process.env.HEALTH_PORT;
        delete process.env.PKEY;
        delete process.env.SSLCERT;
        return {};
      }
    }));

    const config = require("../app/src/config");
    expect(config).toBeDefined();
    expect(config.host).toBe("af-connect.local");
    expect(config.port).toBe(9998);
    expect(config.sslPort).toBe(9999);
    expect(config.healthPort).toBe(9803);
    expect(config.pkey).toBe("./cert_and_key/defaultprivatekey.crt");
    expect(config.sslcert).toBe("./cert_and_key/defaultcertificate.crt");
    expect(config.ssoDomain).toBe(undefined);
    done();
  });

  test("default values", async done => {
    jest.mock("dotenv", () => ({
      config: () => {
        process.env.HOST = "af-connect.local";
        process.env.PORT = 9998;
        process.env.SSL_PORT = 9999;
        process.env.HEALTH_PORT = 9803;
        process.env.PKEY = "./cert_and_key/defaultprivatekey.crt";
        process.env.SSLCERT = "./cert_and_key/defaultcertificate.crt";
        return {};
      }
    }));

    const config = require("../app/src/config");
    expect(config).toBeDefined();
    expect(config.host).toBe("af-connect.local");
    expect(config.port).toBe("9998");
    expect(config.sslPort).toBe("9999");
    expect(config.healthPort).toBe("9803");
    expect(config.pkey).toBe("./cert_and_key/defaultprivatekey.crt");
    expect(config.sslcert).toBe("./cert_and_key/defaultcertificate.crt");
    expect(config.ssoDomain).toBe(undefined);
    done();
  });
});
