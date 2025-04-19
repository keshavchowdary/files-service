const restana = require("restana");
const bodyParser = require("body-parser");

const registerRoutes = require("./api/routes/index.route");
const { initConfig } = require('./app.config');
const { connectToDB } = require("./database/db.config");
initConfig();

const app = restana();

app.use((req, res, next) => {
  if (req.body === undefined) req.body = {};
  if (req.query === undefined) req.query = {};
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.send(204);
  } else {
    next();
  }
});

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
