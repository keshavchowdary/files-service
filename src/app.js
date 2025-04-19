const restana = require("restana");
const bodyParser = require("body-parser");

const registerRoutes = require("./api/routes/index.route");
const { initConfig } = require('./app.config');
const { connectToDB } = require("./database/db.config");
initConfig();

const app = restana();

connectToDB()
.then(() => {
    app.use(bodyParser.json());
    registerRoutes(app);
    const PORT = process.env.PORT;
    app.start(PORT).then(() => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
