require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

const express = require("express");

const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");

const authMiddleware = require("./middleware/authenticationMiddleware");
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const errorFormatter = require("./middleware/errorFormatter");
const applyMiddleware = require("./middleware/index");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const itemRoutes = require("./routes/itemRoutes");
const collaboratorRoutes = require("./routes/collaboratorRoutes");
const pollRoutes = require("./routes/pollRoutes");
const doneRoutes = require("./routes/doneRoutes")
const splitbillsRoutes = require("./routes/splitbillsRoutes")

const app = express();
app.use(cors());

applyMiddleware(app);

// const openApiPath = "doc/openapi2.yaml";
// const file = fs.readFileSync(openApiPath, "utf8");
// const swaggerDocument = yaml.parse(file);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: openApiPath,
//     validateRequests: true,
//   })
// );

// app.use(databaseMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/wishlist", authMiddleware, wishlistRoutes);
app.use("/api/wishlist-item", authMiddleware, itemRoutes);
app.use("/api/collaborator", authMiddleware, collaboratorRoutes);
app.use("/api/poll", authMiddleware, pollRoutes);
app.use("/api/done", authMiddleware, doneRoutes);
app.use("/api/splitbills", authMiddleware, splitbillsRoutes);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(errorFormatter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
