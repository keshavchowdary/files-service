const { checkHealth } = require("../controllers/health.controller");

function healthRoutes(app) {
  app.get("/health", checkHealth);
}

module.exports = healthRoutes;
