const semver = require("semver");
const checkDependencies = require("check-dependencies");

module.exports = options => {
  if (!options) options = {};
  if (!options.compatibleWith) options.compatibleWith = {};

  options.compatibleWith.error = Object.keys(options.compatibleWith)
    .map(key => {
      if (!semver.validRange(options.compatibleWith[key])) {
        return `Invalid sememantic versioning range on options.compatibleWith['${key}']`;
      }
      return false;
    })
    .filter(element => {
      return element !== false;
    });

  return (req, res, next) => {
    return checkDependencies({}).then(dependencies => {
      let status = "UP";
      if (options.compatibleWith.error.length > 0) status = "ERRORED";
      if (!dependencies.depsWereOk) status = "ERRORED";

      return res.json({
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        status: status,
        uptime: process.uptime(),
        compatibleWith: options.compatibleWith || {},
        dependencies: dependencies
      });
    });
  };
};
