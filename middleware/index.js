const applyBodyParser = require("./bodyParser");
// const applyHelmet = require("./helmet");
const applyPermissionPolicy = require("./setPermissionPolicy");

module.exports = (app) => {
  // applyHelmet(app);
  applyBodyParser(app);
  // applyPermissionPolicy(app);
};
