const filesRoutes = require("./files.route");
const healthRoutes = require("./health.route");

function registerRoutes(app) {
  healthRoutes(app);
  filesRoutes(app);
}

module.exports = registerRoutes;
