const restana = require("restana");
const bodyParser = require("body-parser");
const cors = require("cors");

const registerRoutes = require("./api/routes/index.route");
const { initConfig } = require('./app.config');
const { connectToDB } = require("./database/db.config");
initConfig();

const app = restana();

const allowedOrigins = ["http://localhost:4200", "https://file-service-presentation.vercel.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.body === undefined) req.body = {};
  if (req.query === undefined) req.query = {};
  next();
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
